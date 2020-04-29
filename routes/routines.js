const express = require('express');
const router = express.Router();;
const moment = require('moment')
const Routine = require('../models/Routine');
const { forwardAuthenticated } = require('../config/auth')
const User = require('../models/User');

// var userInfo = require('./users')
// var userId = userInfo.userId
// console.log(userId)

router.post('/routine' , async (req, res) =>{
    // console.log("Routine")
    // console.log(req.user)
    console.log("Routine")
    const routine = new Routine({
        ...req.body ,
        owner: req.user._id 
    })
    

    try{
        await routine.save()
        console.log(req.user_id)

        // console.log(user._id)
        res.status(201).send(routine)

    } catch(e){
        res.status(400).send(e)

    }
})

router.get('/routine' , async (req, res) => {
    const routine = await Routine.find({})

    try{
        if(!routine){
            return res.status(404).send()
        }

        res.send(routine)

    }catch(e){
        res.status(500).send(e)
    }
})


router.get('/routines/:id' , async (req, res) =>{


    try{
        const routine = await Routine.find({owner: req.params.id })

        if(!routine){
            return res.status(404).send()
        }

        res.send(routine)
        
    }catch(e){
        res.status(500).send(e)

    }
})


router.get('/routine/:id' , async (req, res) =>{
    const _id=req.params.id

    try{
        const routine = await Routine.findOne({_id })

        if(!routine){
            return res.status(404).send()
        }

        res.send(routine)
        
    }catch(e){
        res.status(500).send(e)

    }
})


router.patch('/routine/:id' , async ( req , res) => {
    //const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedupdates = ['routineItem', 'itemName' , 'unit' , 'startDate' , 'endDate' , 'timesPerDay' , 'beforeAfterMeal' , 'times' ,'notification' ,'notificationFor' ]
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try{
        //const task = await Task.findOne({ _id: req.params.id , owner: req.user._id})
        const routine = await Routine.findOne({ _id: req.params.id })
        if(!routine){
            return res.status(404).send()
        }

        updates.forEach((update) => routine[update] = req.body[update])
        await routine.save()
        res.send(routine)
    }catch(e){
        res.status(400).send(e)
    }

})

router.delete('/routine/:id'  , async(req , res) =>{
    try{
        //const task = await Task.findOneAndDelete({_id: req.params.id , owner: req.user._id})
        const routine = await Routine.findOneAndDelete({_id: req.params.id})

        if(!routine){
            return res.status(404).send()
        }

        res.send(routine)

    }catch(e){

        res.status(500).send(e)

    }
})


module.exports = router