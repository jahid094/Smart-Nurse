const express = require("express");
const router = express.Router();
const Guardianship = require("../models/Guardianship");
const User = require("../models/User");
const async = require("async");

router.post("/users/sendRequest", async (req, res) => {
  let requester;
  if (req.user) {
    requester = req.user._id;
  } else {
    requester = req.body.owner;
  }

  const gurdian = new Guardianship({
    ...req.body,
    requester,
  });

  const userexist = await Guardianship.find({
    "recipients.id": req.body.recipients[0].id,
    requester: req.user._id,
  });

  console.log(req.body.recipients[0].id);
  console.log(userexist);

  try {
    if (userexist.length > 0) {
      return res.send("already pending or added");
    }
    await gurdian.save();
    return res.send(gurdian);
  } catch (e) {
    return res.send(e);
  }
});

router.delete('/requestDelete/:id'  , async(req , res) =>{
  try{
      //const task = await Task.findOneAndDelete({_id: req.params.id , owner: req.user._id})
      const user = await Guardianship.findOneAndDelete({
        "recipients.id": req.user._id,
        "recipients.status": false,
        "requester": req.params.id
      })

      if(!user){
          return res.status(404).json({
              message: 'No request found'
          })
      }

      res.json({
          message: 'Request deleted successfully'
      })
  }catch(error){
      res.status(500).json({
          message: error
      })
  }
})

router.patch("/users/acceptRequest", async (req, res) => {
  const gurdian = await Guardianship.find({
    "recipients.id": req.user._id,
    "recipients.status": false,
    requester: req.body.requester,
  });
  // const sender = gurdian.requester;
  if (gurdian) {
    // console.log(gurdian[0])
    gurdian[0].recipients[0].status = true;
    await gurdian[0].save();
    return res.send(gurdian);
  }
  return res.send("gurdian not found");
});

module.exports = router;
