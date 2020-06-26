const express = require('express');
const router = express.Router();;
const moment = require('moment')
// const Moment = require('moment');
const Routine = require('../models/Routine');
/* const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment); */
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

router.post('/routineNotification' , async (req, res) =>{
    const {id} = req.body
    let userId
    if(req.user){
        userId = req.user._id
    } else {
        userId = id
    }

    try {
        const routine = await Routine.find({owner: userId})

        var today = new Date();
        today = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0');
        // console.log("Today:"+moment(new Date()).format())

        var compareDate;
        var startDate;
        var endDate;
        var compareDateTime = moment(new Date()).format();
        var dateTimeBetween;
        var dateTimeRange;
        var subtractTime;
        var notificationArray = [];

        routine.forEach(function(entry) {
            /* console.log("Start Loop")
            console.log(entry.startDate);
            console.log(entry.endDate); */
            compareDate = moment(today, "YYYY/MM/DD");
            startDate   = moment(entry.startDate, "YYYY/MM/DD");
            endDate     = moment(entry.endDate, "YYYY/MM/DD");
            subtractTime = entry.notification.split(' ')
            // console.log('Subtract Minute:'+subtractTime[1])
            for(let time of entry.times){
                // console.log("Start Time Loop")
                var endDateTime = moment(`${today} ${time.time}`, 'YYYY-MM-DD HH:mm').format()
                var startDateTime = moment(endDateTime).subtract(subtractTime[1], 'minutes').format();
                /* console.log('Compare DateTime: '+compareDateTime);
                console.log('Start DateTime: '+startDateTime);
                console.log('End DateTime: '+endDateTime); */
                dateTimeBetween = moment(compareDateTime, 'YYYY-MM-DD HH:mm').isBetween(moment(startDateTime, 'YYYY-MM-DD HH:mm'), moment(endDateTime, 'YYYY-MM-DD HH:mm'), null, '[]')
                if(dateTimeBetween || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(startDateTime, 'YYYY-MM-DD HH:mm') || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(endDateTime, 'YYYY-MM-DD HH:mm')){
                    // console.log('If')
                    dateTimeRange = true
                } else{
                    // console.log('Else')
                    dateTimeRange = false
                }
                /* console.log('DateTimeRange: '+dateTimeRange)
                console.log("End Time Loop") */
                if(dateTimeRange){
                    // console.log('Date Time Range Block')
                    notificationArray.push(entry)
                    break;
                } else {
                }
            }
            // console.log("End Loop")
        });


        if (notificationArray === undefined || notificationArray.length == 0) {
            return res.status(404).json({
                message: "You have no upcoming notification"
            })
        }

        return res.json({
            routine: notificationArray
        })
    } catch (e) {
        res.status(500).json({
           message: e
        })
    }
})

module.exports = router