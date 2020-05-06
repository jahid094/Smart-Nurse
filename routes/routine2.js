const express = require('express');
const router = express.Router();
const Routine2 = require('../models/Routine2');

const { google } = require('googleapis')
const { OAuth2 } = google.auth

// const oAuth2Client = new OAuth2('759600775406-9neojbfh0vbofalflkg1idho3ul9qiap.apps.googleusercontent.com', 'ctyV03lx7NhS-F9qhgX12lhI')
const oAuth2Client = new OAuth2('624964228888-0s7o05kb4s1k6udhfeu3qjq729slrms1.apps.googleusercontent.com',
'IBsN3UhKZIINJrFbzkjGPmuJ')

oAuth2Client.setCredentials({
    refresh_token:
    '1//04RoeUBqGGgdwCgYIARAAGAQSNwF-L9IrSR6BexMgRMGr-Kt9hQSqo7a5Qd1d3mbpf46ufAZat52qy049Fxny73lkjUu0mPxPOG0'
})

const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
})

router.post('/routine2' , async (req, res) =>{
    const {startDate, endDate} = req.body
    const routine = new Routine2({
        ...req.body ,
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
    const length = routine.times.length
    console.log(length)

    let i
    for(i = 0; i < routine.times.length; i++){
        const eventStartTime = new Date(startDate)
        console.log(req.body.times[i].time)
        let input = req.body.times[i].time
        var fields = input.split(':');
        var hour = fields[0];
        var minute = fields[1];
        eventStartTime.setHours(hour)
        eventStartTime.setMinutes(minute)
        console.log(eventStartTime)
        const eventEndTime = new Date(endDate)
        eventEndTime.setHours(hour)
        eventEndTime.setMinutes(minute)

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
                    minutes: routine.notification
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
                return console.log('Calendar Event Created '+i)
            })
        })
    }

    
})

router.delete('/routine2/:id'  , async(req , res) =>{
    try{
        const routine = await Routine2.findOneAndDelete({_id: req.params.id})
        if(!routine){
            return res.status(404).json({
                message: 'Routine not found'
            })
        }
        calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date(routine.startDate),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                console.log('Upcoming 10 events:');
                events.map((event, i) => {
                  const start = event.start.dateTime || event.start.date;
                  console.log(event.id);
                  console.log(`${start} - ${event.summary}`);
                  calendar.events.delete({
                    calendarId: 'primary',
                    eventId: event.id,
                }, (err, res) => {
                    if(err){
                        return console.log('Calendar Event Delete Creation Error: '+err)
                    }
                    return console.log('Calendar Event Deleted')
                });
                });
            } else {
                console.log('No upcoming events found.');
            }
        });
        res.json({
            message: 'Routine deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
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
    const routine = await Routine2.findOne({ _id: req.params.id })
    const startDateOfRoutine = routine.startDate
    try{
        if(!routine){
            return res.status(404).json({ 
                message: 'Routine not found'
            })
        }

        updates.forEach((update) => routine[update] = req.body[update])
        await routine.save()
        calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date(startDateOfRoutine),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                console.log('Upcoming 10 events:');
                events.map((event, i) => {
                  const start = event.start.dateTime || event.start.date;
                  console.log(event.id);
                  console.log(`${start} - ${event.summary}`);
                  const eventStartTime = new Date(routine.startDate)
                    console.log(routine.times[i].time)
                    let input = routine.times[i].time
                    var fields = input.split(':');
                    var hour = fields[0];
                    var minute = fields[1];
                    eventStartTime.setHours(hour)
                    eventStartTime.setMinutes(minute)
                    console.log(eventStartTime)
                    const eventEndTime = new Date(routine.endDate)
                    eventEndTime.setHours(hour)
                    eventEndTime.setMinutes(minute)
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
                    eventId: event.id,
                    resource: eventUpdate
                }, (err, res) => {
                    if(err){
                        return console.log('Calendar Event Update Creation Error: '+err)
                    }
                    return console.log('Calendar Event Updated'+ res)
                });
                });
            } else {
                console.log('No upcoming events found.');
            }
        });
        const length = routine.times.length
        console.log(length)
        let i
        /* for(i = 0; i < routine.times.length; i++){
            const eventStartTime = new Date(routine.startDate)
            console.log(routine.times[i].time)
            let input = routine.times[i].time
            var fields = input.split(':');
            var hour = fields[0];
            var minute = fields[1];
            eventStartTime.setHours(hour)
            eventStartTime.setMinutes(minute)
            console.log(eventStartTime)
            const eventEndTime = new Date(routine.endDate)
            eventEndTime.setHours(hour)
            eventEndTime.setMinutes(minute)

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
        } */
        res.json({ 
            message: 'Routine updated successfully'
        })
    }catch(error){
        res.status(400).json({ 
            message: error
        })
    }
})

module.exports = router