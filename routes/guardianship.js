const express = require("express");
const router = express.Router();
const Guardianship = require("../models/Guardianship");

//Send Request
router.post("/users/sendRequest", async (req, res) => {
  let owner;
  if (req.user) {
    console.log("If")
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  }

  const gurdian = new Guardianship({
    ...req.body,
    requester: owner,
  });
  
  const patientExist = await Guardianship.findOne({
    "recipients.id": req.body.recipients[0].id,
    "recipients.status": true,
    requester: owner
  });

  const guardianExist = await Guardianship.findOne({
    "recipients.id": owner,
    "recipients.status": true,
    requester: req.body.recipients[0].id
  });

  const requestExist = await Guardianship.findOne({
    "recipients.id": req.body.recipients[0].id,
    requester: owner
  });

  const receiveRequestExist = await Guardianship.findOne({
    "recipients.id": owner,
    requester: req.body.recipients[0].id
  });

  try {
    if (patientExist) {
      return res.status(200).json({
        message: "You are already guardian of that user."
      });
    } else if (guardianExist) {
      return res.status(200).json({
        message: "You are already patient of that user."
      });
    } else if (requestExist) {
      return res.status(200).json({
        message: "You have already sent a request to that user."
      });
    } else if (receiveRequestExist) {
      return res.status(200).json({
        message: "You have already got a request from that user."
      });
    }
    await gurdian.save();
    return res.status(200).json({
      gurdian,
      message: 'You have succesfully sent request to that user'
    });
  } catch (error) {
    return res.status(404).json({
      mesaage: error
    });
  }
});

//Accept Request
router.patch("/users/acceptRequest", async (req, res) => {
  const gurdian = await Guardianship.findOne({
    "recipients.id": req.user._id,
    "recipients.status": false,
    requester: req.body.requester
  });
  if (gurdian) {
    gurdian.recipients[0].status = true;
    await gurdian.save();
    return res.status(200).json({
      gurdian,
      mesaage: 'You are now patient of that user.'
    });
  }
  return res.status(404).json({
    mesaage: "No Request Found"
  });
});

//Delete Request
router.delete('/requestDelete/:id', async(req , res) =>{
  try{
      const user = await Guardianship.findOneAndDelete({
        "recipients.id": req.user._id,
        "recipients.status": false,
        _id: req.params.id
      })
      if(!user){
          return res.status(404).json({
              message: 'No request found'
          })
      }
      res.status(200).json({
          message: 'Request deleted successfully'
      })
  }catch(error){
      res.status(500).json({
          message: error
      })
  }
})

//Request List
router.post("/users/requestList", async (req, res) => {
  let owner;
  if (req.user) {
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  }

  const requestExist = await Guardianship.find({
    "recipients.id": owner,
    "recipients.status": false,
  });

  try {
    if (requestExist.length > 0) {
      return res.status(200).json({
        requestExist
      });
    } else {
      return res.status(200).json({
        mesaage: 'You have no request.'
      });
    }
  } catch (error) {
    return res.status(404).json({
      mesaage: error
    });
  }
});

module.exports = router;