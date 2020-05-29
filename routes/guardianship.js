const express = require("express");
const router = express.Router();
const Guardianship = require("../models/Guardianship");
const User = require("../models/User");

//Send Request
router.post("/users/sendRequest", async (req, res) => {
  let owner;
  let ownerName;
  if (req.user) {
    owner = req.user._id;
    ownerName = req.user.firstname + " " + req.user.lastname;
  } else {
    owner = req.body.owner;
    const ownerNameFind = await User.findOne({ _id: owner });
    if (ownerNameFind) {
      ownerName = ownerNameFind.firstname + " " + ownerNameFind.lastname;
    }
  }

  const gurdian = new Guardianship({
    ...req.body,
    requester: owner,
    requesterName: ownerName
  });

  const patientExist = await Guardianship.findOne({
    "recipients.id": req.body.recipients[0].id,
    "recipients.status": true,
    requester: owner
  });

  const previouspatientCheck = await Guardianship.findOne({
    "recipients.id": req.body.recipients[0].id,
    "recipients.status": true
  });

  const guardianExist = await Guardianship.findOne({
    "recipients.id": owner,
    "recipients.status": true,
    requester: req.body.recipients[0].id
  });

  const myStatusCheck = await Guardianship.findOne({
    "recipients.id": owner,
    "recipients.status": true
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
    } else if (previouspatientCheck) {
      return res.status(200).json({
        message: "This user has a guardian. So You can't send request to become his guardian."
      });
    } else if (guardianExist) {
      return res.status(200).json({
        message: "You are already patient of that user."
      });
    } else if (myStatusCheck) {
      return res.status(200).json({
        message: "You are already patient of a user. So You can't send request to anyone to become his guardian."
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
      message: "You have succesfully sent request to that user"
    });
  } catch (error) {
    return res.status(404).json({
      mesaage: error
    });
  }
});

//Accept Request
router.patch("/users/acceptRequest", async (req, res) => {
  let owner;
  if (req.user) {
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  }

  const user = await User.findOne({
    _id: req.body.requester
  });

  const guardianUser = await User.findOne({
    _id: owner
  });

  const gurdian = await Guardianship.findOne({
    "recipients.id": owner,
    "recipients.status": false,
    requester: req.body.requester
  });
  if (gurdian) {
    user.patientList.push({patientId: owner, patientName: guardianUser.firstname+' '+guardianUser.lastname})
    guardianUser.guardianList.push({guardianId: req.body.requester, guardianName: user.firstname+' '+user.lastname})
    gurdian.recipients[0].status = true;
    await user.save();
    await guardianUser.save();
    await gurdian.save();
    return res.status(200).json({
      gurdian,
      message: "You are now patient of that user."
    });
  }
  return res.status(404).json({
    message: "No Request Found"
  });
});

//Delete Request
router.delete("/requestDelete/:id", async (req, res) => {
  /* let owner;
  if (req.user) {
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  } */
  try {
    const user = await Guardianship.findOneAndDelete({
      // "recipients.id": owner,
      "recipients.status": false,
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({
        message: "No request found"
      });
    }
    res.status(200).json({
      message: "Request deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

//Cancel Request
router.post("/users/cancelRequest", async (req, res) => {
  let owner;
  if (req.user) {
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  }
  try {
    const request = await Guardianship.findOneAndDelete({
      "recipients.id": req.body.patientId,
      "recipients.status": true,
      requester: owner
    });
    await User.findByIdAndUpdate(
      owner, { $pull: { "patientList": { patientId: req.body.patientId } } }, { multi: true },
      function(err) {
        if (err) { 
          return res.status(500).json({
            message: error
          }); 
        }
    });
    await User.findByIdAndUpdate(
      req.body.patientId, { $pull: { "guardianList": { guardianId: owner } } },{ "multi": true },
      function(err) {
        if (err) { 
          return res.status(500).json({
            message: error
          }); 
        }
    });
    if(!request){
      return res.status(200).json({
        message: 'No Request Found.'
      });
    }
    return res.status(200).json({
      message: 'Request Deleted Successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
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
    "recipients.status": false
  });

  try {
    if (requestExist.length > 0) {
      return res.status(200).json({
        requestExist
      });
    } else {
      return res.status(200).json({
        mesaage: "You have no request."
      });
    }
  } catch (error) {
    return res.status(404).json({
      mesaage: error
    });
  }
});

module.exports = router;