import React, {useState} from 'react';
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-date-picker';
import {Modal, Button} from 'react-bootstrap'
import TimePicker from 'react-time-picker';
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import ApiCalendar from './ApiCalendar'
import './AddRoutine.css'

/* eslint no-eval: 0 */

const UpdateRoutineModal = props => {
    const [show, setShow] = useState(true);
    const [routineItem, setRoutineItem] = useState(props.rowInfo.routineItem)
    const [itemName, setItemName] = useState(props.rowInfo.itemName)
    const [unit, setUnit] = useState(props.rowInfo.unit)
    const [startDate, setStartDate] = useState(props.rowInfo.startDate)
    const [endDate, setEndDate] = useState(props.rowInfo.endDate)
    const [timesPerDay, setTimesPerDay] = useState(props.rowInfo.timesPerDay)
    const [beforeAfterMeal, setBeforeAfterMeal] = useState(props.rowInfo.beforeAfterMeal)
    const [time1, setTime1] = useState(props.rowInfo.time1 || '10:00')
    const [time2, setTime2] = useState(props.rowInfo.time2 || '11:00')
    const [time3, setTime3] = useState(props.rowInfo.time3 || '12:00')
    const [time4, setTime4] = useState(props.rowInfo.time4 || '13:00')
    const [time5, setTime5] = useState(props.rowInfo.time5 || '14:00')
    const [notificationState, setNotificationState] = useState(props.rowInfo.notificationState)
    const [userType, setUserType] = useState(props.rowInfo.userType)
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = () => {
        setShow(false)
        props.onClear()
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setDisable(true)
        let times = [];
        let i
        for (i = 0; i < timesPerDay; i++) {
            // console.log("Time"+(i+1)+":"+eval('time'+(i+1)))
            times.push({
                time: eval('time'+(i+1))
            })
        }
        let startingDate
        let endingDate
        if(startDate === (props.rowInfo.startDate)){
            startingDate = moment(props.rowInfo.startDate).format('YYYY/MM/DD')
        } else {
            startingDate = moment(startDate).format('YYYY/MM/DD')
        }
        if(endDate === (props.rowInfo.endDate)){
            endingDate = moment(props.rowInfo.endDate).format('YYYY/MM/DD')
        } else {
            endingDate = moment(endDate).format('YYYY/MM/DD')
        }
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+props.rowInfo.id);
            console.log(response.data)
            let notificationTime = notificationState.split(' ');
            console.log(notificationTime[0])
            console.log(notificationTime[1])
            console.log(notificationTime[2])
            if(response.data.timesPerDay === timesPerDay){
                console.log('if')
                let i
                let eventMinTime = []
                let eventMaxTime = []
                let eventMinTimeUTC = []
                let eventMaxTimeUTC = []
                let events = []
                for (i = 0; i < response.data.timesPerDay; i++) {
                    eventMinTime[i] = new Date(response.data.startDate)
                    let input = response.data.times[i].time
                    var fields = input.split(':');
                    var hour = fields[0];
                    var minute = fields[1];
                    eventMinTime[i].setHours(hour)
                    eventMinTime[i].setMinutes(minute)
                    eventMinTimeUTC[i] = moment(eventMinTime[i]).format();                
                    eventMaxTime[i] = new Date(response.data.endDate)
                    eventMaxTime[i].setHours(hour)
                    eventMaxTime[i].setMinutes(minute)
                    eventMaxTimeUTC[i] = moment(eventMaxTime[i]).format();                
                }
                if(response.data.timesPerDay > 1){
                    if(!moment(response.data.startDate).isSame(response.data.endDate)){
                        await ApiCalendar.listUpcomingEvents(10, eventMinTimeUTC[0], eventMaxTimeUTC[response.data.timesPerDay - 1]).then(({result}) => {
                            events = result.items
                        });
                    } else {
                        await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                            events = result.items
                        });
                    }
                } else {
                    await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                        events = result.items
                    });
                }
                console.log('Event List Loop Finish');
                console.log('Event List:');
                console.log(events);
                let updateId = []
                for (i = 0; i < events.length; i++) {
                    if(eventMinTimeUTC.indexOf(events[i].start.dateTime) > -1 && eventMaxTimeUTC.indexOf(events[i].end.dateTime) > -1){
                        updateId.push(events[i].id)
                    }
                }
                for (i = 0; i < updateId.length; i++) {
                    console.log(updateId[i])
                    /* if (ApiCalendar.sign) {
                        ApiCalendar.deleteEvent(deleteId[i]).then(({result}) => {
                            setMessage('Your event is deleted.')
                        });
                    } else{
                        setMessage('Your event is not deleted because you are not signed in.')
                    } */
                }
                if(routineItem === 'Activity'){
                    console.log('Activity If')
                    for (i = 0; i < timesPerDay; i++) {
                        console.log('Create Event Loop')
                        const eventStartTime = new Date(startingDate)
                        let input = times[i].time
                        fields = input.split(':');
                        hour = fields[0];
                        minute = fields[1];
                        eventStartTime.setHours(hour)
                        eventStartTime.setMinutes(minute)
                        eventStartTime.setSeconds(0)
                        console.log(eventStartTime)
                        const eventEndTime = new Date(endingDate)
                        eventEndTime.setHours(hour)
                        eventEndTime.setMinutes(minute)
                        eventEndTime.setSeconds(0)
                        const event = {
                            summary: `${itemName}`,
                            description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${beforeAfterMeal}\nNotification For: ${userType}
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
                        console.log(event)
                        await ApiCalendar.updateEvent(event, updateId[i]).then((result) => {
                            console.log('Updated Event:');
                            console.log(result);
                            setMessage('Your Event is updated successfully.')
                        }).catch((error) => {
                            console.log('Update Event Creation Error:');
                            console.log(error);
                            setMessage('Your Event is not updated successfully.')
                        });
                        const updateResponse = await axios.patch(process.env.REACT_APP_BACKEND_URL+'routine/'+props.rowInfo.id, {
                            routineItem,
                            itemName,
                            unit,
                            startDate: startingDate,
                            endDate: endingDate,
                            timesPerDay: timesPerDay,
                            beforeAfterMeal,
                            times,
                            notification: notificationState,
                            notificationFor: userType 
                        }); 
                        console.log(updateResponse.data)
                        setMessage(updateResponse.data.message)
                    }
                } else {
                    console.log('Activity Else')
                    for (i = 0; i < timesPerDay; i++) {
                        console.log('Create Event Loop')
                        const eventStartTime = new Date(startingDate)
                        let input = times[i].time
                        fields = input.split(':');
                        hour = fields[0];
                        minute = fields[1];
                        eventStartTime.setHours(hour)
                        eventStartTime.setMinutes(minute)
                        eventStartTime.setSeconds(0)
                        console.log(moment(eventStartTime).format())
                        const eventEndTime = new Date(endingDate)
                        eventEndTime.setHours(hour)
                        eventEndTime.setMinutes(minute)
                        eventEndTime.setSeconds(0)
                        console.log(moment(eventEndTime).format())
                        const event = {
                            summary: `${itemName} ${unit}`,
                            description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${beforeAfterMeal}\nNotification For: ${userType}
                            `, 
                            start: {
                                dateTime: moment(eventStartTime).format(),
                                timeZone: 'Asia/Dhaka'
                            },
                            end: {
                                dateTime: moment(eventEndTime).format(),
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
                        console.log(event)
                        await ApiCalendar.updateEvent(event, updateId[i]).then((result) => {
                            console.log('Updated Event:');
                            console.log(result);
                            setMessage('Your Event is updated successfully.')
                        }).catch((error) => {
                            console.log('Update Event Creation Error:');
                            console.log(error);
                            setMessage('Your Event is not updated successfully.')
                        });
                        const updateResponse = await axios.patch(process.env.REACT_APP_BACKEND_URL+'routine/'+props.rowInfo.id, {
                            routineItem,
                            itemName,
                            unit,
                            startDate: startingDate,
                            endDate: endingDate,
                            timesPerDay: timesPerDay,
                            beforeAfterMeal,
                            times,
                            notification: notificationState,
                            notificationFor: userType 
                        }); 
                        console.log(updateResponse.data)
                        setMessage(updateResponse.data.message)
                    }   
                }
            } else {
                console.log('else')
                let i
                let eventMinTime = []
                let eventMaxTime = []
                let eventMinTimeUTC = []
                let eventMaxTimeUTC = []
                let events = []
                for (i = 0; i < response.data.timesPerDay; i++) {
                    eventMinTime[i] = new Date(response.data.startDate)
                    let input = response.data.times[i].time
                    fields = input.split(':');
                    hour = fields[0];
                    minute = fields[1];
                    eventMinTime[i].setHours(hour)
                    eventMinTime[i].setMinutes(minute)
                    eventMinTimeUTC[i] = moment(eventMinTime[i]).format();                
                    eventMaxTime[i] = new Date(response.data.endDate)
                    eventMaxTime[i].setHours(hour)
                    eventMaxTime[i].setMinutes(minute)
                    eventMaxTimeUTC[i] = moment(eventMaxTime[i]).format();                
                }
                if(response.data.timesPerDay > 1){
                    if(!moment(response.data.startDate).isSame(response.data.endDate)){
                        await ApiCalendar.listUpcomingEvents(10, eventMinTimeUTC[0], eventMaxTimeUTC[response.data.timesPerDay - 1]).then(({result}) => {
                            events = result.items
                        });
                    } else {
                        await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                            events = result.items
                        });
                    }
                } else {
                    await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                        events = result.items
                    });
                }
                console.log('Event List Loop Finish');
                console.log('Event List:');
                console.log(events);
                let deleteId = []
                for (i = 0; i < events.length; i++) {
                    if(eventMinTimeUTC.indexOf(events[i].start.dateTime) > -1 && eventMaxTimeUTC.indexOf(events[i].end.dateTime) > -1){
                        deleteId.push(events[i].id)
                    }
                }
                for (i = 0; i < deleteId.length; i++) {
                    console.log(deleteId[i])
                    if (ApiCalendar.sign) {
                        ApiCalendar.deleteEvent(deleteId[i]).then(({result}) => {
                            console.log('Your event is deleted.')
                            // setMessage('Your event is deleted.')
                        });
                    } else{
                        console.log('Your event is not deleted because you are not signed in.')
                        // setMessage('Your event is not deleted because you are not signed in.')
                    }
                }
                if(routineItem === 'Activity'){
                    console.log('Activity If')
                    for (i = 0; i < timesPerDay; i++) {
                        console.log('Create Event Loop')
                        const eventStartTime = new Date(startingDate)
                        let input = times[i].time
                        fields = input.split(':');
                        hour = fields[0];
                        minute = fields[1];
                        eventStartTime.setHours(hour)
                        eventStartTime.setMinutes(minute)
                        eventStartTime.setSeconds(0)
                        console.log(eventStartTime)
                        const eventEndTime = new Date(endingDate)
                        eventEndTime.setHours(hour)
                        eventEndTime.setMinutes(minute)
                        eventEndTime.setSeconds(0)
                        const event = {
                            summary: `${itemName}`,
                            description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${beforeAfterMeal}\nNotification For: ${userType}
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
                        console.log(event)
                        await ApiCalendar.createEvent(event).then((result) => {
                            console.log('New Event:');
                            console.log(result);
                            setMessage('Your Event is created successfully.')
                        }).catch((error) => {
                            console.log('New Event Creation Error:');
                            console.log(error);
                            setMessage('Your Event is not created successfully.')
                        });
                        const updateResponse = await axios.patch(process.env.REACT_APP_BACKEND_URL+'routine/'+props.rowInfo.id, {
                            routineItem,
                            itemName,
                            unit,
                            startDate: startingDate,
                            endDate: endingDate,
                            timesPerDay: timesPerDay,
                            beforeAfterMeal,
                            times,
                            notification: notificationState,
                            notificationFor: userType 
                        }); 
                        console.log(updateResponse.data)
                        setMessage(updateResponse.data.message)
                    }
                } else {
                    console.log('Activity Else')
                    for (i = 0; i < timesPerDay; i++) {
                        console.log('Create Event Loop')
                        const eventStartTime = new Date(startingDate)
                        let input = times[i].time
                        fields = input.split(':');
                        hour = fields[0];
                        minute = fields[1];
                        eventStartTime.setHours(hour)
                        eventStartTime.setMinutes(minute)
                        eventStartTime.setSeconds(0)
                        console.log(eventStartTime)
                        const eventEndTime = new Date(endingDate)
                        eventEndTime.setHours(hour)
                        eventEndTime.setMinutes(minute)
                        eventEndTime.setSeconds(0)
                        const event = {
                            summary: `${itemName} ${unit}`,
                            description: `Routine Item: ${routineItem}\nItem Name: ${itemName}\nTimes Per Day: ${timesPerDay}\n${beforeAfterMeal}\nNotification For: ${userType}
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
                        console.log(event)
                        await ApiCalendar.createEvent(event).then((result) => {
                            console.log('New Event:');
                            console.log(result);
                            setMessage('Your Event is created successfully.')
                        }).catch((error) => {
                            console.log('New Event Creation Error:');
                            console.log(error);
                            setMessage('Your Event is not created successfully.')
                        });
                        const updateResponse = await axios.patch(process.env.REACT_APP_BACKEND_URL+'routine/'+props.rowInfo.id, {
                            routineItem,
                            itemName,
                            unit,
                            startDate: startingDate,
                            endDate: endingDate,
                            timesPerDay: timesPerDay,
                            beforeAfterMeal,
                            times,
                            notification: notificationState,
                            notificationFor: userType 
                        }); 
                        console.log(updateResponse.data)
                        setMessage(updateResponse.data.message)
                    }
                }
            }
            setIsLoading(false)
            setDisable(false)
            // setMessage(response.data.message)
        } catch (error) {
            console.log(error.response.data); 
            setIsLoading(false)
            setDisable(false)
            // setMessage(error.response.data.message)
        } 
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

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor: '#0C0C52'}}>
            <Modal.Title style={{color: 'white'}}>Update Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
            <div className="container-fluid bg-white">
                {isLoading && <LoadingSpinner asOverlay/>}
                <div className="container">
                    <div className="row py-5">
                        <div className="col-lg-12">
                        <form style={{color: '#757575'}} onSubmit={submitHandler}>
                                <div className="form-row mb-4">
                                    <div className="col-lg-3 mt-2">
                                        <span className="font-weight-bold ml-2 h5">Routine Item</span>
                                    </div>
                                    <div className="col-7 col-sm-7">
                                    <select className="w-100 text-justify rounded-pill p-1" style={{backgroundColor: '#E6E6E6'}} value={routineItem} onChange={(e) => setRoutineItem(e.target.value)}>
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
                                        <DatePicker className="form-control text-justify rounded-pill" onChange={(date) => {
                                            setStartDate(date)
                                        }} value={startDate}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>End Date</label>
                                        <DatePicker className="form-control text-justify rounded-pill" onChange={(date) => {
                                            setEndDate(date)
                                        }} value={endDate}/>
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
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={beforeAfterMeal} onChange={(e) => setBeforeAfterMeal(e.target.value)}>
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
                                                    onChange={(inputTime) => {
                                                        eval('setTime'+(k+1))(inputTime)
                                                    }}
                                                    value={eval('time'+(k+1))} 
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="col-12 col-sm-6 mb-4">
                                    <div className="lg-form mr-4">
                                        <label>Notification Time</label>
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={notificationState} onChange={(e) => setNotificationState(e.target.value)}>
                                            <option value="Before 5 mins">Notify Before 5 mins</option>
                                            <option value="Before 15 mins">Notify Before 15 mins</option>
                                            <option value="Before 30 mins">Notify Before 30 mins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                                <div className="form-row my-4">
                                    <p className="font-weight-bold h4 pl-1" style={{color: '#857072'}}>Notification For</p>
                                </div>
                                <div className="form-row my-4"> 
                                    <input type="radio" name="userType" value='Me' checked={userType === 'Me'} onChange={(e) => setUserType('Me')} disabled = {(disable)? "disabled" : ""}/><label className="radio-inline px-2 h5 mr-2 mt-n2">Me</label>
                                    <input type="radio" name="userType" value='Guardian' checked={userType === 'Guardian'} onChange={(e) => setUserType('Guardian')} disabled = {(disable)? "disabled" : ""}/><label className="radio-inline px-2 h5 mr-2 mt-n2">Guardian</label>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-lg-4">
                                    </div>
                                    <div className="col-lg-4">
                                        <button type="submit" className="btn btn-lg btn-block rounded-pill text-light" style={{backgroundColor: '#0C0C52'}}>Update</button>
                                    </div>
                                    <div className="col-lg-4">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Okay
            </Button>
        </Modal.Footer>
    </Modal>;
};

export default UpdateRoutineModal;