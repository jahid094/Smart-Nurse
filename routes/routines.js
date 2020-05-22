const express = require('express');
const router = express.Router();;
// const moment = require('moment')
const Routine = require('../models/Routine');
// const { forwardAuthenticated } = require('../config/auth')
// const User = require('../models/User');

router.post('/routine' , async (req, res) =>{
    let owner
    if(req.user){
        owner = req.user._id
    } else {
        owner = req.body.owner
    }
    const routine = new Routine({
        ...req.body ,
        owner
    })
    try{
        await routine.save()
        res.status(201).json({
            message: 'Routine Added Successfully',
            routine
        })
    } catch(error){
        res.status(400).json({
            message: error
        })
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


router.post('/routines' , async (req, res) =>{
    const {id} = req.body
    let userId
    if(req.user){
        userId = req.user._id
    } else {
        userId = id
    }
    try{
        const routine = await Routine.find({owner: userId})
        if (routine === undefined || routine.length == 0) {
            return res.status(404).json("Routine not found")
        }
        return res.status(200).json({
            routine
        })
    }catch(e){
        res.status(500).json(e)
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
        return res.status(400).json({ 
            message: 'Invalid updates!'
        })
    }

    try{
        //const task = await Task.findOne({ _id: req.params.id , owner: req.user._id})
        const routine = await Routine.findOne({ _id: req.params.id })
        if(!routine){
            return res.status(404).json({ 
                message: 'Routine not found'
            })
        }

        updates.forEach((update) => routine[update] = req.body[update])
        await routine.save()
        res.json({ 
            message: 'Routine updated successfully'
        })
    }catch(error){
        res.status(400).json({ 
            message: error
        })
    }

})

router.delete('/routine/:id'  , async(req , res) =>{
    try{
        //const task = await Task.findOneAndDelete({_id: req.params.id , owner: req.user._id})
        const routine = await Routine.findOneAndDelete({_id: req.params.id})

        if(!routine){
            return res.status(404).json({
                message: 'Routine not found'
            })
        }

        res.json({
            message: 'Routine deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
})


module.exports = router