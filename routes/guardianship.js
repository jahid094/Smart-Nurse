const express = require('express');
const router = express.Router();
const Guardianship = require('../models/Guardianship');
const User = require('../models/User');
const async = require('async');

router.post('/users/sendRequest' , async (req ,res) =>{
    const user = await User.findById({ _id: req.body.receiverId})

    if(!user){
        return res.send("User doesn't exist")
    }

    const gurdian = new Guardianship()

    gurdian.requester = req.user._id
    gurdian.recipients.id = user._id

    try{

        await gurdian.save()
        return res.send(gurdian)

    }catch(e){
        return res.send(e)
    }

    
})

module.exports = router;