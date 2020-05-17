const express = require('express');
const router = express.Router();
const Guardianship = require('../models/Guardianship');
const User = require('../models/User');
const async = require('async');

router.post('/users/sendRequest' , async (req ,res) =>{
    let requester
    if(req.user){
        requester = req.user._id
    } else {
        requester = req.body.owner
    }

    const gurdian = new Guardianship({
        ...req.body,
        requester
    })

    try{
        await gurdian.save()
        return res.send(gurdian)

    }catch(e){
        return res.send(e)
    }
})

router.patch('/users/acceptRequest' , async (req ,res) =>{
    const gurdian = await Guardianship.find({"recipients.id": req.user._id,"recipients.status":false,requester:req.body.requester})
    // const sender = gurdian.requester;
    if(gurdian){
        // console.log(gurdian[0])
        gurdian[0].recipients[0].status = true
        await gurdian[0].save()
        return res.send(gurdian)
    }
    return res.send('gurdian not found')
})

module.exports = router;