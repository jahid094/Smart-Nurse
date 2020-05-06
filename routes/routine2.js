const express = require('express');
const router = express.Router();
const Routine2 = require('../models/Routine2');

const { google } = require('googleapis')
const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2('759600775406-9neojbfh0vbofalflkg1idho3ul9qiap.apps.googleusercontent.com', 'ctyV03lx7NhS-F9qhgX12lhI')

oAuth2Client.setCredentials({
    refresh_token:
    '1//04JaCHg5UqRioCgYIARAAGAQSNwF-L9IrrliBGNJiaUtSLzdH4VyOdSgWSXApQ-qO71bQ0MoRso_Q1SOxZf6GtExF-lakHC45vIY'
})

const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
})

router.post('/routine2' , async (req, res) =>{

    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getDay() + 2)

    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getDay() + 4)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

    const routine = new Routine2({
        ...req.body ,
        startDate: eventStartTime,
        endDate: eventEndTime,
        owner: '5ea95178ca3a3241d8644a05'
    })
    try{
        await routine.save()

        res.status(201).json({
            message: 'Routine Added Successfully'
        })

    } catch(error){
        res.status(400).json({
            message: error
        })
    }

    console.log(req.body.itemName)
    console.log(routine.itemName)

    const length = (routine.times).length
    console.log(length)


    const event = {
        summary: 'Routine Created',
        description: `
        routineItem: ${routine.routineItem} 
        itemName: ${routine.itemName}
        timesPerDay: ${routine.timesPerDay}
        beforeAfterMeal: ${routine.beforeAfterMeal}
        notificationFor: ${routine.notificationFor}
        `, 
        start: {
            dateTime: eventStartTime,
            timeZone: 'Asia/Dhaka'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'Asia/Dhaka'
        },
        reminders: {
            useDefault: false,
            overrides: [{
                method: "popup",
                minutes: routine.notification
              },
              {
                method: "email",
                "minutes": routine.notification
              }
            ]
        },
        colorId: 9
    }

    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'Asia/Dhaka',
            items: [{
                id: 'primary'
            }]
        }
    }, (err, res) => {
        if(err){
            return console.log('Free Busy Query Error: '+err)
        }

        return calendar.events.insert({
            calendarId: 'primary',
            resource: event
        }, (err, res) => {
            if(err){
                return console.log('Calendar Event Creation Error: '+err)
            }
            return console.log('Calendar Event Created')
        })
    })

})

router.delete('/routine2/:id'  , async(req , res) =>{
    try{
        //const task = await Task.findOneAndDelete({_id: req.params.id , owner: req.user._id})
        const routine = await Routine2.findOneAndDelete({_id: req.params.id})

        //13ge1omptj4k7o034udfd3a83o

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


    calendar.events.delete({
        calendarId: 'primary',
        eventId: '13ge1omptj4k7o034udfd3a83o',
    }, (err, res) => {
        if(err){
            return console.log('Calendar Event Delete Creation Error: '+err)
        }
        return console.log('Calendar Event Deleted'+ res)
    });
})

router.patch('/routine2/:id' , async ( req , res) => {
    //const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedupdates = ['routineItem', 'itemName' , 'unit' , 'timesPerDay' , 'beforeAfterMeal' , 'times' ,'notification' ,'notificationFor' ]
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if(!isValidOperation){
        return res.status(400).json({ 
            message: 'Invalid updates!'
        })
    }
    //const task = await Task.findOne({ _id: req.params.id , owner: req.user._id})
    const routine = await Routine2.findOne({ _id: req.params.id })

    try{
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

    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getDay() + 4)

    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getDay() + 8)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

    const eventUpdate = {
        summary: 'Routine Updated',
        description: `
        routineItem: ${routine.routineItem} 
        itemName: ${routine.itemName}
        timesPerDay: ${routine.timesPerDay}
        beforeAfterMeal: ${routine.beforeAfterMeal}
        notificationFor: ${routine.notificationFor}
        `, 
        start: {
            dateTime: eventStartTime,
            timeZone: 'Asia/Dhaka'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'Asia/Dhaka'
        },
        reminders: {
            useDefault: false,
            overrides: [{
                method: "popup",
                minutes: routine.notification
              },
              {
                method: "email",
                "minutes": routine.notification
              }
            ]
        },
        colorId: 9
    }




    calendar.events.update({
        calendarId: 'primary',
        eventId: 'fsphh9dtgmdel433jpd7o7tbdg',
        resource: eventUpdate
    }, (err, res) => {
        if(err){
            return console.log('Calendar Event Update Creation Error: '+err)
        }
        return console.log('Calendar Event Updated'+ res)
    });

})

module.exports = router