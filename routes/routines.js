const express = require('express');
const router = express.Router();;
const moment = require('moment')
const Routine = require('../models/Routine');

router.post('/routine' , async (req, res) =>{
    let owner
    if(req.user){
        owner = req.user._id
    } else {
        owner = req.body.owner
    }
    const statusDay = [];
    const statusTime = [];
    const startDate  = moment(req.body.startDate, "YYYY-MM-DD")
    const endDate  = moment(req.body.endDate, "YYYY-MM-DD")
    const dateDifference = endDate.diff(startDate, 'days') + 1
    console.log(dateDifference)
    console.log('TimesPerDay:'+req.body.timesPerDay)
    Array.from({ length: req.body.timesPerDay }, (v, k) => (
        statusTime.push({
            done: false,
            visible: true
        })
    ))
    console.log(statusTime)
    Array.from({ length: dateDifference }, (v, k) => (
        statusDay.push({
            statusTime
        })
    ))
    console.log(statusDay)
    console.log(statusDay[0])
    /* return res.status(201).json({
        message: 'Successful'
    }) */
    const routine = new Routine({
        ...req.body,
        statusDay,
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
    let owner;
    if (req.user) {
        owner = req.user._id;
    } else {
        owner = req.body.owner;
    }
    /* if (userId === undefined) {
        return res.status(404).json({
            message: "You must login to see your notification"
        })
    } */

    try {
        const routine = await Routine.find({owner})

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
        var newArray = [];
        
        routine.forEach(function(entry, i) {
            /* console.log('Other loop')
            console.log(entry._id);
            console.log(entry.startDate)
            console.log(entry.endDate) */
            compareDate = moment(today, "YYYY/MM/DD");
            startDate   = moment(entry.startDate, "YYYY/MM/DD");
            endDate     = moment(entry.endDate, "YYYY/MM/DD");
            subtractTime = entry.notification.split(' ')
            /* console.log(moment(compareDate, 'YYYY/MM/DD').isBetween(moment(startDate, 'YYYY/MM/DD'), moment(endDate, 'YYYY/MM/DD')))
            console.log(moment(compareDate, 'YYYY/MM/DD').isSame(startDate, 'YYYY/MM/DD'))
            console.log(moment(compareDate, 'YYYY/MM/DD').isSame(endDate, 'YYYY/MM/DD')) */

            if(moment(compareDate, 'YYYY/MM/DD').isBetween(moment(startDate, 'YYYY/MM/DD'), moment(endDate, 'YYYY/MM/DD')) || moment(compareDate, 'YYYY/MM/DD').isSame(startDate, 'YYYY/MM/DD') || moment(compareDate, 'YYYY/MM/DD').isSame(endDate, 'YYYY/MM/DD')){
                /* console.log('Date Compare')
                console.log(entry._id)
                
                console.log('Date Difference')
                console.log(compareDate.diff(startDate, 'days'))
                console.log(entry.statusDay) */
                entry.times.forEach(function (time, j) {
                    /* console.log('Routine:'+i+'Time:'+j)
                    console.log(routine[i].statusDay[compareDate.diff(startDate, 'days')].statusTime[j])
                    console.log(routine[i].statusDay[compareDate.diff(startDate, 'days')].statusTime[j].visible) */
                    if(routine[i].statusDay[compareDate.diff(startDate, 'days')].statusTime[j].visible){
                        newArray.push({
                            notificationArray: entry,
                            notificationTime: time
                        })
                    }
                });
                /* for(let time of entry.times){
                    newArray.push({
                        notificationArray: entry,
                        notificationTime: time
                    })
                } */
                // console.log(entry.status[compareDate.diff(startDate, 'days')].visible)
                // entry.status[compareDate.diff(startDate, 'days')].visible = true
                /* try {
                    routine[i].save()
                } catch (error) {
                    return res.status(404).json({
                        message: error
                    })
                } */
            }
        })
        /* newArray.forEach(function(entry) {
            console.log("New Array Start Loop 1")
            console.log(entry.notificationTime.time);
        }) */

        newArray.sort(function (a, b) {
            return a.notificationTime.time.localeCompare(b.notificationTime.time);
        });

        newArray.forEach(function(entry) {
            /* console.log("New Array Start Loop 2")
            console.log(entry.notificationArray.startDate);
            console.log(entry.notificationArray.endDate); */
            compareDate = moment(today, "YYYY/MM/DD");
            startDate   = moment(entry.notificationArray.startDate, "YYYY/MM/DD");
            endDate     = moment(entry.notificationArray.endDate, "YYYY/MM/DD");
            subtractTime = entry.notificationArray.notification.split(' ')
            /* console.log(subtractTime)
            console.log(entry.notificationTime) */
            var startDateTime = moment(moment(`${today} ${entry.notificationTime.time}`, 'YYYY-MM-DD HH:mm').format()).subtract(subtractTime[1], 'minutes').format()
            var endDateTime = moment(today, "YYYY/MM/DD").add(1, 'days').format()
            /* console.log('Compare DateTime: '+compareDateTime);
            console.log('Start DateTime: '+startDateTime);
            console.log('End DateTime: '+endDateTime) */
            dateTimeBetween = moment(compareDateTime, 'YYYY-MM-DD HH:mm').isBetween(moment(startDateTime, 'YYYY-MM-DD HH:mm'), moment(endDateTime, 'YYYY-MM-DD HH:mm'), null, '[]')
            if(dateTimeBetween || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(startDateTime, 'YYYY-MM-DD HH:mm') || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(endDateTime, 'YYYY-MM-DD HH:mm')){
                // console.log('If')
                dateTimeRange = true
            } else{
                // console.log('Else')
                dateTimeRange = false
            }
            // console.log('DateTimeRange: '+dateTimeRange)
            if(dateTimeRange){
                // console.log('Date Time Range Block')
                notificationArray.push(entry)
            }
        })

        if (notificationArray === undefined || notificationArray.length == 0) {
            return res.status(200).json({
                message: "You have no upcoming notification"
            })
        }

        return res.status(200).json({
            routine: notificationArray
        })

        /* return res.status(200).json({
            newArray
        }) */
        // console.log(routine[2])

        // routine.forEach(function(entry) {
            /* console.log("Start Loop")
            console.log(entry.startDate);
            console.log(entry.endDate); */
           /*  compareDate = moment(today, "YYYY/MM/DD");
            startDate   = moment(entry.startDate, "YYYY/MM/DD");
            endDate     = moment(entry.endDate, "YYYY/MM/DD");
            subtractTime = entry.notification.split(' ')
            
            // console.log('Subtract Minute:'+subtractTime[1])
            for(let time of entry.times){
                // console.log("Start Time Loop")
                var endDateTime = moment(`${entry.endDate} ${time.time}`, 'YYYY-MM-DD HH:mm').format()
                var startDateTime = moment(endDateTime).subtract(subtractTime[1], 'minutes').format(); */
                /* console.log('Compare DateTime: '+compareDateTime);
                console.log('Start DateTime: '+startDateTime);
                console.log('End DateTime: '+endDateTime); */
                /* dateTimeBetween = moment(compareDateTime, 'YYYY-MM-DD HH:mm').isBetween(moment(startDateTime, 'YYYY-MM-DD HH:mm'), moment(endDateTime, 'YYYY-MM-DD HH:mm'), null, '[]')
                if(dateTimeBetween || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(startDateTime, 'YYYY-MM-DD HH:mm') || moment(compareDateTime, 'YYYY-MM-DD HH:mm').isSame(endDateTime, 'YYYY-MM-DD HH:mm')){
                    // console.log('If')
                    dateTimeRange = true
                } else{
                    // console.log('Else')
                    dateTimeRange = false
                } */
                /* console.log('DateTimeRange: '+dateTimeRange)
                console.log("End Time Loop") */
                /* if(dateTimeRange){
                    // console.log('Date Time Range Block')
                    notificationArray.push(entry)
                    break;
                } else {
                }
            }
            // console.log("End Loop")
        }); */
    } catch (e) {
        res.status(500).json({
           message: e
        })
    }
})

router.patch('/acceptRoutine' , async ( req , res) => {
    var timeIndex
    const routine = await Routine.findOne({ _id: req.body.id })

    var today = new Date();
    today = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0');

    today = moment(today, "YYYY/MM/DD");

    // console.log('Date Difference:' +today.diff(routine.startDate, 'days'))

    routine.times.forEach(function (time, i) {
        // console.log(req.body.time.localeCompare(time.time))
        if(req.body.time.localeCompare(time.time) === 0){
            timeIndex = i
        }
    })

    if(today.diff(routine.startDate, 'days') >= 0){
        if(timeIndex !== undefined){
            // console.log('TimeIndex: '+timeIndex)
            routine.statusDay[today.diff(routine.startDate, 'days')].statusTime[timeIndex].done = true
            routine.statusDay[today.diff(routine.startDate, 'days')].statusTime[timeIndex].visible = false
            await routine.save()
        } else {
            return res.status(404).json({
                message: 'This routine is not exist in '+today
            })
        }
    } else {
        return res.status(404).json({
            message: 'This routine is not exist in '+today
        })
    }

    return res.status(200).json({
        message: 'Successful',
        routine
    })
})

router.patch('/cancelRoutine' , async ( req , res) => {
    var timeIndex
    const routine = await Routine.findOne({ _id: req.body.id })

    var today = new Date();
    today = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0');

    today = moment(today, "YYYY/MM/DD");

    // console.log('Date Difference:' +today.diff(routine.startDate, 'days'))

    routine.times.forEach(function (time, i) {
        // console.log(req.body.time.localeCompare(time.time))
        if(req.body.time.localeCompare(time.time) === 0){
            timeIndex = i
        }
    })

    if(today.diff(routine.startDate, 'days') >= 0){
        if(timeIndex !== undefined){
            // console.log('TimeIndex: '+timeIndex)
            routine.statusDay[today.diff(routine.startDate, 'days')].statusTime[timeIndex].visible = false
            await routine.save()
        } else {
            return res.status(404).json({
                message: 'This routine is not exist in '+today
            })
        }
    } else {
        return res.status(404).json({
            message: 'This routine is not exist in '+today
        })
    }

    return res.status(200).json({
        message: 'Successful',
        routine
    })
})

module.exports = router