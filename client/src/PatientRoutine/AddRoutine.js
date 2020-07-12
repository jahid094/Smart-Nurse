import React, {useState,useContext} from 'react';
import axios from 'axios'
import moment from 'moment'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import ApiCalendar from './ApiCalendar'
import './AddRoutine.css'

const AddRoutine = props => {
    const auth = useContext(AuthContext)
    const [routineItem, setRoutineItem] = useState('Medicine')
    const [itemName, setItemName] = useState('')
    const [unit, setUnit] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [timesPerDay, setTimesPerDay] = useState(1)
    const [mealState, setMealState] = useState('Before Meal')
    const [timeList, setTimeList] = useState([
        {
          time: '10:00'
        },
        {
          time: '11:00'
        },
        {
          time: '12:00'
        },
        {
          time: '13:00'
        },
        {
          time: '14:00'
        }
    ]);
    const [notificationState, setNotificationState] = useState('Before 5 mins')
    // const [userType, setUserType] = useState('Me')
    const [routineFormLoading, setRoutineFormLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState('')
    const [guardianCheck, setGuardianCheck] = useState(false)
    const [patientCheck, setPatientCheck] = useState(true)

    const submitHandler = async (event) => {
        event.preventDefault()
        if(ApiCalendar.sign){
            if(moment(startDate).isSameOrBefore(endDate)){
                if(auth.userRole === 'null'){
                    setMessage('You have to become a guardian of a user or yourself Or You have to become a patient of a user or yourself to create a routine.')
                } else if(auth.userRole === 'Guardian/Patient'){
                    console.log('if2')
                    setRoutineFormLoading(true)
                    setDisable(true)
                    let times = timeList.slice(0, timesPerDay);
                    let notificationTime = notificationState.split(' ');
                    let i
                    if(routineItem === 'Activity'){
                        try {
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                routineItem,
                                itemName,
                                startDate: moment(startDate).format('YYYY/MM/DD'),
                                endDate: moment(endDate).format('YYYY/MM/DD'),
                                timesPerDay: timesPerDay,
                                beforeAfterMeal: mealState,
                                times,
                                notification: notificationState,
                                notificationFor: 'Me'
                            });
                            setRoutineItem('Medicine')
                            setItemName('')
                            setUnit('')
                            setStartDate(new Date())
                            setEndDate(new Date())
                            setTimesPerDay(1)
                            setMealState('Before Meal')
                            setTimeList([
                                {
                                time: '10:00'
                                },
                                {
                                time: '11:00'
                                },
                                {
                                time: '12:00'
                                },
                                {
                                time: '13:00'
                                },
                                {
                                time: '14:00'
                                }
                            ]);
                            setNotificationState('Before 5 mins')
                            // setUserType('Me')
                            setRoutineFormLoading(false)
                            setDisable(false)
                            setMessage(response.data.message)
                            for (i = 0; i < timesPerDay; i++) {
                                const eventStartTime = new Date(startDate)
                                let input = times[i].time
                                var fields = input.split(':');
                                var hour = fields[0];
                                var minute = fields[1];
                                eventStartTime.setHours(hour)
                                eventStartTime.setMinutes(minute)
                                eventStartTime.setSeconds(0)
                                const eventEndTime = new Date(endDate)
                                eventEndTime.setHours(hour)
                                eventEndTime.setMinutes(minute)
                                eventEndTime.setSeconds(0)
                                const event = {
                                    summary: `${itemName}`,
                                    description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: Me
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
                                            minutes: notificationTime[1]
                                        }
                                        ]
                                    },
                                    colorId: 9
                                }
                                await ApiCalendar.createEvent(event).then((result) => {
                                }).catch((error) => {
                                    axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                    setMessage('Your Routine is not created successfully.')
                                });
                            }
                            props.pageRender()
                        } catch (error) {
                            setRoutineFormLoading(false)
                            setDisable(false)
                            setMessage(error.response.data.message)
                        }
                    } else {
                        try {
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                routineItem,
                                itemName,
                                unit,
                                startDate: moment(startDate).format('YYYY/MM/DD'),
                                endDate: moment(endDate).format('YYYY/MM/DD'),
                                timesPerDay: timesPerDay,
                                beforeAfterMeal: mealState,
                                times,
                                notification: notificationState,
                                notificationFor: 'Me'
                            });
                            setRoutineItem('Medicine')
                            setItemName('')
                            setUnit('')
                            setStartDate(new Date())
                            setEndDate(new Date())
                            setTimesPerDay(1)
                            setMealState('Before Meal')
                            setTimeList([
                                {
                                time: '10:00'
                                },
                                {
                                time: '11:00'
                                },
                                {
                                time: '12:00'
                                },
                                {
                                time: '13:00'
                                },
                                {
                                time: '14:00'
                                }
                            ]);
                            setNotificationState('Before 5 mins')
                            // setUserType('Me')
                            setRoutineFormLoading(false)
                            setDisable(false)
                            setMessage(response.data.message)
                            for (i = 0; i < timesPerDay; i++) {
                                const eventStartTime = new Date(startDate)
                                let input = times[i].time
                                fields = input.split(':');
                                hour = fields[0];
                                minute = fields[1];
                                eventStartTime.setHours(hour)
                                eventStartTime.setMinutes(minute)
                                eventStartTime.setSeconds(0)
                                const eventEndTime = new Date(endDate)
                                eventEndTime.setHours(hour)
                                eventEndTime.setMinutes(minute)
                                eventEndTime.setSeconds(0)
                                const event = {
                                    summary: `${itemName} ${unit}`,
                                    description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: Me
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
                                            minutes: notificationTime[1]
                                        }
                                        ]
                                    },
                                    colorId: 9
                                }
                                await ApiCalendar.createEvent(event).then((result) => {
                                    setMessage('Your Event is created successfully.')
                                }).catch((error) => {
                                    axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                    setMessage('Your Routine is not created successfully.')
                                });
                                props.pageRender()
                            }
                        } catch (error) {
                            setRoutineFormLoading(false)
                            setDisable(false)
                            setMessage(error.response.data.message)
                        }
                    }
                } else if(auth.userRole === 'Guardian'){
                    console.log('if3')
                    try {
                        const userDetails = await axios.get(process.env.REACT_APP_BACKEND_URL+'getUser/'+auth.userId);
                        // console.log(response)
                        let patientEmail = userDetails.data.user.patientList[0].patientEmail
                        console.log('Patient Email:'+patientEmail)
                        setRoutineFormLoading(true)
                        setDisable(true)
                        let times = timeList.slice(0, timesPerDay);
                        let notificationTime = notificationState.split(' ');
                        let i
                        if(routineItem === 'Activity'){
                            try {
                                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                    routineItem,
                                    itemName,
                                    startDate: moment(startDate).format('YYYY/MM/DD'),
                                    endDate: moment(endDate).format('YYYY/MM/DD'),
                                    timesPerDay: timesPerDay,
                                    beforeAfterMeal: mealState,
                                    times,
                                    notification: notificationState,
                                    notificationFor: (guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')
                                });
                                setRoutineItem('Medicine')
                                setItemName('')
                                setUnit('')
                                setStartDate(new Date())
                                setEndDate(new Date())
                                setTimesPerDay(1)
                                setMealState('Before Meal')
                                setTimeList([
                                    {
                                    time: '10:00'
                                    },
                                    {
                                    time: '11:00'
                                    },
                                    {
                                    time: '12:00'
                                    },
                                    {
                                    time: '13:00'
                                    },
                                    {
                                    time: '14:00'
                                    }
                                ]);
                                setNotificationState('Before 5 mins')
                                // setUserType('Me')
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(response.data.message)
                                for (i = 0; i < timesPerDay; i++) {
                                    const eventStartTime = new Date(startDate)
                                    let input = times[i].time
                                    fields = input.split(':');
                                    hour = fields[0];
                                    minute = fields[1];
                                    eventStartTime.setHours(hour)
                                    eventStartTime.setMinutes(minute)
                                    eventStartTime.setSeconds(0)
                                    const eventEndTime = new Date(endDate)
                                    eventEndTime.setHours(hour)
                                    eventEndTime.setMinutes(minute)
                                    eventEndTime.setSeconds(0)
                                    const event = {
                                        summary: `${itemName}`,
                                        description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${(guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')}
                                        `, 
                                        start: {
                                            dateTime: eventStartTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        end: {
                                            dateTime: eventEndTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        attendees: [
                                            {email: patientEmail}
                                        ],
                                        reminders: {
                                            useDefault: false,
                                            overrides: [{
                                                method: "popup",
                                                minutes: notificationTime[1]
                                            }
                                            ]
                                        },
                                        colorId: 9
                                    }
                                    await ApiCalendar.createEvent(event).then((result) => {
                                    }).catch((error) => {
                                        axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                        setMessage('Your Routine is not created successfully.')
                                    });
                                }
                                props.pageRender()
                            } catch (error) {
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(error.response.data.message)
                            }
                        } else {
                            try {
                                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                    routineItem,
                                    itemName,
                                    unit,
                                    startDate: moment(startDate).format('YYYY/MM/DD'),
                                    endDate: moment(endDate).format('YYYY/MM/DD'),
                                    timesPerDay: timesPerDay,
                                    beforeAfterMeal: mealState,
                                    times,
                                    notification: notificationState,
                                    notificationFor: (guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')
                                });
                                setRoutineItem('Medicine')
                                setItemName('')
                                setUnit('')
                                setStartDate(new Date())
                                setEndDate(new Date())
                                setTimesPerDay(1)
                                setMealState('Before Meal')
                                setTimeList([
                                    {
                                    time: '10:00'
                                    },
                                    {
                                    time: '11:00'
                                    },
                                    {
                                    time: '12:00'
                                    },
                                    {
                                    time: '13:00'
                                    },
                                    {
                                    time: '14:00'
                                    }
                                ]);
                                setNotificationState('Before 5 mins')
                                // setUserType('Me')
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(response.data.message)
                                for (i = 0; i < timesPerDay; i++) {
                                    const eventStartTime = new Date(startDate)
                                    let input = times[i].time
                                    fields = input.split(':');
                                    hour = fields[0];
                                    minute = fields[1];
                                    eventStartTime.setHours(hour)
                                    eventStartTime.setMinutes(minute)
                                    eventStartTime.setSeconds(0)
                                    const eventEndTime = new Date(endDate)
                                    eventEndTime.setHours(hour)
                                    eventEndTime.setMinutes(minute)
                                    eventEndTime.setSeconds(0)
                                    const event = {
                                        summary: `${itemName} ${unit}`,
                                        description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${(guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')}
                                        `, 
                                        start: {
                                            dateTime: eventStartTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        end: {
                                            dateTime: eventEndTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        attendees: [
                                            {email: patientEmail}
                                        ],
                                        reminders: {
                                            useDefault: false,
                                            overrides: [{
                                                method: "popup",
                                                minutes: notificationTime[1]
                                            }
                                            ]
                                        },
                                        colorId: 9
                                    }
                                    await ApiCalendar.createEvent(event).then((result) => {
                                        setMessage('Your Event is created successfully.')
                                    }).catch((error) => {
                                        axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                        setMessage('Your Routine is not created successfully.')
                                    });
                                    props.pageRender()
                                }
                            } catch (error) {
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(error.response.data.message)
                            }
                        }
                    } catch (error) {
                        console.log(error.userDetails.data.message)
                        // setMessage(error.response.data.message)
                    }
                } else if(auth.userRole === 'Patient'){
                    console.log('if4')
                    try {
                        const userDetails = await axios.get(process.env.REACT_APP_BACKEND_URL+'getUser/'+auth.userId);
                        // console.log(response)
                        let guardianEmail = userDetails.data.user.guardianList[0].guardianEmail
                        console.log('Guardian Email:'+guardianEmail)
                        setRoutineFormLoading(true)
                        setDisable(true)
                        let times = timeList.slice(0, timesPerDay);
                        let notificationTime = notificationState.split(' ');
                        let i
                        if(routineItem === 'Activity'){
                            try {
                                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                    routineItem,
                                    itemName,
                                    startDate: moment(startDate).format('YYYY/MM/DD'),
                                    endDate: moment(endDate).format('YYYY/MM/DD'),
                                    timesPerDay: timesPerDay,
                                    beforeAfterMeal: mealState,
                                    times,
                                    notification: notificationState,
                                    notificationFor: (guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')
                                });
                                setRoutineItem('Medicine')
                                setItemName('')
                                setUnit('')
                                setStartDate(new Date())
                                setEndDate(new Date())
                                setTimesPerDay(1)
                                setMealState('Before Meal')
                                setTimeList([
                                    {
                                    time: '10:00'
                                    },
                                    {
                                    time: '11:00'
                                    },
                                    {
                                    time: '12:00'
                                    },
                                    {
                                    time: '13:00'
                                    },
                                    {
                                    time: '14:00'
                                    }
                                ]);
                                setNotificationState('Before 5 mins')
                                // setUserType('Me')
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(response.data.message)
                                for (i = 0; i < timesPerDay; i++) {
                                    const eventStartTime = new Date(startDate)
                                    let input = times[i].time
                                    fields = input.split(':');
                                    hour = fields[0];
                                    minute = fields[1];
                                    eventStartTime.setHours(hour)
                                    eventStartTime.setMinutes(minute)
                                    eventStartTime.setSeconds(0)
                                    const eventEndTime = new Date(endDate)
                                    eventEndTime.setHours(hour)
                                    eventEndTime.setMinutes(minute)
                                    eventEndTime.setSeconds(0)
                                    const event = {
                                        summary: `${itemName}`,
                                        description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${(guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')}
                                        `, 
                                        start: {
                                            dateTime: eventStartTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        end: {
                                            dateTime: eventEndTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        attendees: [
                                            {email: guardianEmail}
                                        ],
                                        reminders: {
                                            useDefault: false,
                                            overrides: [{
                                                method: "popup",
                                                minutes: notificationTime[1]
                                            }
                                            ]
                                        },
                                        colorId: 9
                                    }
                                    await ApiCalendar.createEvent(event).then((result) => {
                                    }).catch((error) => {
                                        axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                        setMessage('Your Routine is not created successfully.')
                                    });
                                }
                                props.pageRender()
                            } catch (error) {
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(error.response.data.message)
                            }
                        } else {
                            try {
                                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine/'+auth.userId, {
                                    routineItem,
                                    itemName,
                                    unit,
                                    startDate: moment(startDate).format('YYYY/MM/DD'),
                                    endDate: moment(endDate).format('YYYY/MM/DD'),
                                    timesPerDay: timesPerDay,
                                    beforeAfterMeal: mealState,
                                    times,
                                    notification: notificationState,
                                    notificationFor: (guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')
                                });
                                setRoutineItem('Medicine')
                                setItemName('')
                                setUnit('')
                                setStartDate(new Date())
                                setEndDate(new Date())
                                setTimesPerDay(1)
                                setMealState('Before Meal')
                                setTimeList([
                                    {
                                    time: '10:00'
                                    },
                                    {
                                    time: '11:00'
                                    },
                                    {
                                    time: '12:00'
                                    },
                                    {
                                    time: '13:00'
                                    },
                                    {
                                    time: '14:00'
                                    }
                                ]);
                                setNotificationState('Before 5 mins')
                                // setUserType('Me')
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(response.data.message)
                                for (i = 0; i < timesPerDay; i++) {
                                    const eventStartTime = new Date(startDate)
                                    let input = times[i].time
                                    fields = input.split(':');
                                    hour = fields[0];
                                    minute = fields[1];
                                    eventStartTime.setHours(hour)
                                    eventStartTime.setMinutes(minute)
                                    eventStartTime.setSeconds(0)
                                    const eventEndTime = new Date(endDate)
                                    eventEndTime.setHours(hour)
                                    eventEndTime.setMinutes(minute)
                                    eventEndTime.setSeconds(0)
                                    const event = {
                                        summary: `${itemName} ${unit}`,
                                        description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${(guardianCheck && patientCheck ? 'Guradian&Patient' : 'Patient')}
                                        `, 
                                        start: {
                                            dateTime: eventStartTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        end: {
                                            dateTime: eventEndTime,
                                            timeZone: 'Asia/Dhaka'
                                        },
                                        attendees: [
                                            {email: guardianEmail}
                                        ],
                                        reminders: {
                                            useDefault: false,
                                            overrides: [{
                                                method: "popup",
                                                minutes: notificationTime[1]
                                            }
                                            ]
                                        },
                                        colorId: 9
                                    }
                                    await ApiCalendar.createEvent(event).then((result) => {
                                        setMessage('Your Event is created successfully.')
                                    }).catch((error) => {
                                        axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                        setMessage('Your Routine is not created successfully.')
                                    });
                                    props.pageRender()
                                }
                            } catch (error) {
                                setRoutineFormLoading(false)
                                setDisable(false)
                                setMessage(error.response.data.message)
                            }
                        }
                    } catch (error) {
                        console.log(error.userDetails.data.message)
                        // setMessage(error.response.data.message)
                    }
                }
            } else {
                setMessage('Start Date should not be greater than End Date.')
            }
        } else {
            setMessage('Please sign in with your google account to create event and get notification of that routine in google calendar.')
        }
        /* if(ApiCalendar.sign){
            if(moment(startDate).isSameOrBefore(endDate)){
                setRoutineFormLoading(true)
                setDisable(true)
                let times = timeList.slice(0, timesPerDay);
                let notificationTime = notificationState.split(' ');
                let i
                if(routineItem === 'Activity'){
                    try {
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine', {
                            routineItem,
                            itemName,
                            startDate: moment(startDate).format('YYYY/MM/DD'),
                            endDate: moment(endDate).format('YYYY/MM/DD'),
                            timesPerDay: timesPerDay,
                            beforeAfterMeal: mealState,
                            times,
                            notification: notificationState,
                            notificationFor: userType,
                            owner: auth.userId 
                        });
                        setRoutineItem('Medicine')
                        setItemName('')
                        setUnit('')
                        setStartDate(new Date())
                        setEndDate(new Date())
                        setTimesPerDay(1)
                        setMealState('Before Meal')
                        setTimeList([
                            {
                              time: '10:00'
                            },
                            {
                              time: '11:00'
                            },
                            {
                              time: '12:00'
                            },
                            {
                              time: '13:00'
                            },
                            {
                              time: '14:00'
                            }
                        ]);
                        setNotificationState('Before 5 mins')
                        setUserType('Me')
                        setRoutineFormLoading(false)
                        setDisable(false)
                        setMessage(response.data.message)
                        for (i = 0; i < timesPerDay; i++) {
                            const eventStartTime = new Date(startDate)
                            let input = times[i].time
                            var fields = input.split(':');
                            var hour = fields[0];
                            var minute = fields[1];
                            eventStartTime.setHours(hour)
                            eventStartTime.setMinutes(minute)
                            eventStartTime.setSeconds(0)
                            const eventEndTime = new Date(endDate)
                            eventEndTime.setHours(hour)
                            eventEndTime.setMinutes(minute)
                            eventEndTime.setSeconds(0)
                            const event = {
                                summary: `${itemName}`,
                                description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${userType}
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
                                        minutes: notificationTime[1]
                                    }
                                    ]
                                },
                                colorId: 9
                            }
                            await ApiCalendar.createEvent(event).then((result) => {
                            }).catch((error) => {
                                axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                setMessage('Your Routine is not created successfully.')
                            });
                        }
                        props.pageRender()
                    } catch (error) {
                        setRoutineFormLoading(false)
                        setDisable(false)
                        setMessage(error.response.data.message)
                    }
                } else {
                    try {
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routine', {
                            routineItem,
                            itemName,
                            unit,
                            startDate: moment(startDate).format('YYYY/MM/DD'),
                            endDate: moment(endDate).format('YYYY/MM/DD'),
                            timesPerDay: timesPerDay,
                            beforeAfterMeal: mealState,
                            times,
                            notification: notificationState,
                            notificationFor: userType,
                            owner: auth.userId 
                        });
                        setRoutineItem('Medicine')
                        setItemName('')
                        setUnit('')
                        setStartDate(new Date())
                        setEndDate(new Date())
                        setTimesPerDay(1)
                        setMealState('Before Meal')
                        setTimeList([
                            {
                              time: '10:00'
                            },
                            {
                              time: '11:00'
                            },
                            {
                              time: '12:00'
                            },
                            {
                              time: '13:00'
                            },
                            {
                              time: '14:00'
                            }
                        ]);
                        setNotificationState('Before 5 mins')
                        setUserType('Me')
                        setRoutineFormLoading(false)
                        setDisable(false)
                        setMessage(response.data.message)
                        for (i = 0; i < timesPerDay; i++) {
                            const eventStartTime = new Date(startDate)
                            let input = times[i].time
                            fields = input.split(':');
                            hour = fields[0];
                            minute = fields[1];
                            eventStartTime.setHours(hour)
                            eventStartTime.setMinutes(minute)
                            eventStartTime.setSeconds(0)
                            const eventEndTime = new Date(endDate)
                            eventEndTime.setHours(hour)
                            eventEndTime.setMinutes(minute)
                            eventEndTime.setSeconds(0)
                            const event = {
                                summary: `${itemName} ${unit}`,
                                description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${mealState}\nNotification For: ${userType}
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
                                        minutes: notificationTime[1]
                                    }
                                    ]
                                },
                                colorId: 9
                            }
                            await ApiCalendar.createEvent(event).then((result) => {
                                setMessage('Your Event is created successfully.')
                            }).catch((error) => {
                                axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+response.data.routine._id);
                                setMessage('Your Routine is not created successfully.')
                            });
                        props.pageRender()
                    }
                    } catch (error) {
                        setRoutineFormLoading(false)
                        setDisable(false)
                        setMessage(error.response.data.message)
                    }
                }
            } else {
                setMessage('Start Date should not be greater than End Date.')
            }
        } else {
            setMessage('Please sign in with your google account to create event and get notification of that routine in google calendar.')
        } */
    }

    const itemNamePlaceHolder = () => {
        if(routineItem === 'Medicine'){
            return 'Medicine Name'
        }
        if(routineItem === 'Activity'){
            return 'Activity Name'
        }
        if(routineItem === 'Food'){
            return 'Food Name'
        }
    }

    const unitClassHandler = () => {
        if(routineItem === 'Activity'){
            return 'd-none'
        }
    }

    const messageHandler = () => {
        setMessage(null)
    }

    const handleTimeChange = (inputTime, index) => {
        let newArr = [...timeList]; 
        newArr[index].time = inputTime;
        setTimeList(newArr); 
    };

    return <React.Fragment>
        <div className="container-fluid bg-white">
            {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
            <div className="container">
                <div className="row py-5">
                    <div className="col-lg-8">
                        <form style={{color: '#757575'}} onSubmit={submitHandler}>
                            <div className="form-row mb-4">
                                <div className="col-lg-3 mt-2">
                                    <span className="font-weight-bold ml-2 h5">Routine Item</span>
                                </div>
                                <div className="col-7 col-sm-7">
                                   <select className="w-100 text-justify rounded-pill p-1" style={{backgroundColor: '#E6E6E6'}} value={routineItem} onChange={(e) => setRoutineItem(e.target.value)} disabled = {(disable)? "disabled" : ""}>
                                      <option value="Medicine">Medicine</option>
                                      <option value="Activity">Activity</option>
                                      <option value="Food">Food</option>
                                    </select>
                                </div>
                                <div className="col-lg-3">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>{itemNamePlaceHolder()}</label>
                                        <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder={itemNamePlaceHolder()} name="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className={"col-12 col-sm-6 mb-4 "+ unitClassHandler()}>
                                    <div className="lg-form mr-4">
                                        <label>Unit</label>
                                        <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="Unit" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required = {(routineItem !== 'Activity')? "required" : ""} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>Start Date</label>
                                        <DatePicker className="form-control text-justify rounded-pill" selected={startDate}  dateFormat={moment(startDate).format('DD/MM/YYYY')} onChange={(date) => {
                                            setStartDate(date)
                                        }} value={startDate} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>End Date</label>
                                        <DatePicker className="form-control text-justify rounded-pill" onChange={(date) => {
                                            setEndDate(date)
                                        }} value={endDate} disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>Times Per Day</label>
                                        <input type="number" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} value={timesPerDay} placeholder="Times Per Day" min="1" max="5" onChange={(e) => setTimesPerDay(e.target.value)} required disabled = {(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>Before/After Meal</label>
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={mealState} onChange={(e) => setMealState(e.target.value)} disabled = {(disable)? "disabled" : ""}>
                                            <option value="Before Meal">Before Meal</option>
                                            <option value="After Meal">After Meal</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    Array.from({ length: timesPerDay }, (v, k) => (
                                        <div className="col-12 col-sm-6 mb-4" key={k}>
                                            <div className="lg-form mr-4 mb-4 mb-sm-0">
                                                <label>{"Time "+(k+1)}</label>
                                                <TimePicker
                                                    className="form-control text-justify rounded-pill"
                                                    onChange={(inputTime) => 
                                                        handleTimeChange(inputTime, k)
                                                    }
                                                    value={timeList[k].time}
                                                    disabled = {(disable)? "disabled" : ""} 
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>Notification Time</label>
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={notificationState} onChange={(e) => setNotificationState(e.target.value)} disabled = {(disable)? "disabled" : ""}>
                                            <option value="Before 5 mins">Notify Before 5 mins</option>
                                            <option value="Before 15 mins">Notify Before 15 mins</option>
                                            <option value="Before 30 mins">Notify Before 30 mins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={"form-row my-4 "+(auth.userRole === 'Guardian/Patient' ? 'd-none' : '')}>
                                <p className="font-weight-bold h4 pl-1" style={{color: '#857072'}}>Notification For</p>
                            </div>
                            <div className={"form-row my-4 "+(auth.userRole === 'Guardian/Patient' ? 'd-none' : '')}> 
                                <Form.Check
                                    inline
                                    label="Guardian"
                                    type="checkbox"
                                    id="guardian"
                                    value="Guardian"
                                    checked={guardianCheck ? "checked" : ""}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setGuardianCheck(true)
                                        } else {
                                            setGuardianCheck(false)
                                        }
                                    }}
                                />
                                <Form.Check
                                    inline
                                    label="Patient"
                                    type="checkbox"
                                    id="patient"
                                    value="Patient"
                                    required
                                    checked={patientCheck ? "checked" : ""}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setPatientCheck(true)
                                        } else {
                                            setPatientCheck(false)
                                        }
                                    }}
                                />
                                {/* <input className="form-check-input" type="checkbox" name="userType" value='Guardian' id="guardian" checked={userType === 'Me'} onChange={(e) => setUserType('Me')} disabled = {(disable)? "disabled" : ""}/><label className="rform-check-label px-2 h5 mr-2" for="guardian">Guardian</label> */}
                                {/* <input className="form-check-input" type="checkbox" name="userType" value='Patient' id="patient" checked={userType === 'Guardian'} onChange={(e) => setUserType('Guardian')} disabled = {(disable)? "disabled" : ""} required/><label className="radio-inline px-2 h5 mr-2" for="patient">Patient</label> */}
                            </div>
                            <div className="row mt-5">
				                <div className="col-lg-4">
                                </div>
                                {routineFormLoading && <LoadingSpinner/>}
                                <div className="col-lg-4">
                                    <button type="submit" className="btn btn-lg btn-block rounded-pill text-light" style={{backgroundColor: '#0C0C52'}} disabled = {(disable)? "disabled" : ""}>ADD</button>
                                </div>
                                <div className="col-lg-4">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 form-background d-none d-lg-block">
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>;
};

export default AddRoutine;