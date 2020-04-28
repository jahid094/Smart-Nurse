import React, {useState} from 'react';
// import TimePicker from 'react-gradient-timepicker';
import DatePicker from 'react-date-picker';
// import TimePicker from 'react-times';
// import 'react-times/css/material/default.css';
// import TimeKeeper from 'react-timekeeper';
import TimePicker from 'react-time-picker';
import './AddRoutine.css'

const AddRoutine = () => {
    const [routineItem, setRoutineItem] = useState('Medicine')
    const [itemName, setItemName] = useState('')
    const [unit, setUnit] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    // const [endDate, setEndDate] = useState(new Date(new Date().getTime()+(3*24*60*60*1000)))
    const [endDate, setEndDate] = useState(new Date())
    const [continuity, setContinuity] = useState(0)
    const [mealState, setMealState] = useState('Before Meal')
    const [time, setTime] = useState('10:00')
    const [notificationState, setNotificationState] = useState('Notify Before 5 mins')
    const [userType, setUserType] = useState('Me')

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(routineItem)
        console.log(itemName)
        console.log(unit)
        console.log(startDate)
        console.log(endDate)
        console.log(continuity)
        console.log(mealState)
        console.log(time)
        console.log(notificationState)
        console.log(userType)
    }

    /* const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        // var strTime = hours + ':' + minutes + ' ' + ampm;
        var strTime = hours + ':' + minutes;
        return strTime;
    } */

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let diffDays
    if(endDate > startDate){
        diffDays = Math.ceil(Math.abs((endDate - startDate) / oneDay));
    } else {
        diffDays = 0
    }

    return <React.Fragment>
        <div className="container-fluid bg-white">
            <div className="container">
                <div className="row py-5">
                    <div className="col-lg-8">
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
                               
                            <div className="form-row mb-4">
                                <div className="col">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="Item name" name="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="lg-form mr-4" >
                                        <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="Unit" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
               
                            <div className="form-row mb-4">
                                <div className="col">
                                    <div className="lg-form mr-4">
                                        <label>Start Date</label>
                                        {/* <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="Start Date"/> */}
                                        <DatePicker className="form-control text-justify rounded-pill" onChange={(date) => {
                                            setStartDate(date)
                                        }} value={startDate}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="lg-form mr-4">
                                        <label>End Date</label>
                                        {/* <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="End Date"/> */}
                                        <DatePicker className="form-control text-justify rounded-pill" onChange={(date) => {
                                            setEndDate(date)
                                        }} value={endDate}/>
                                    </div>
                                </div>
                            </div>
               
                            <div className="form-row mb-4">
                                <div className="col">
                                    <div className="lg-form mr-4">
                                        <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} value={diffDays} placeholder="Continuity" onChange={(e) => setContinuity(diffDays)} readOnly/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="lg-form mr-4">
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={mealState} onChange={(e) => setMealState(e.target.value)}>
                                            <option value="Before Meal">Before Meal</option>
                                            <option value="After Meal">After Meal</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
              
                            <div className="form-row mb-4">
                                <div className="col-12 col-sm-6">
                                    <div className="lg-form mr-4 mb-4 mb-sm-0">
                                        {/* <input type="text" className="form-control text-justify rounded-pill" style={{backgroundColor: '#E6E6E6'}} placeholder="Time"/> */}
                                        {/* <TimePicker
                                            // time="01:00"
                                            time={formatAMPM(new Date())}
                                            theme="Bourbon"
                                            className="form-control timepicker text-justify rounded-pill"
                                            placeholder="Start Time"
                                            onSet={(val) => {
                                                alert('val:' + val.format12);
                                            }}
                                        /> */}

                                        {/* <TimePicker
                                            onFocusChange={onFocusChange()}
                                            onTimeChange={onTimeChange()}
                                        /> */}
                                        {/* <TimeKeeper
                                            time={time}
                                            onChange={(data) => setTime(data.formatted12)}
                                        /> */}

                                        <TimePicker
                                        className="form-control text-justify rounded-pill"
                                            onChange={(inputTime) => {
                                                setTime(inputTime)
                                            }}
                                            value={time} 
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="lg-form mr-4">
                                        <select className="w-100 text-secondary text-justify rounded-pill p-2" style={{backgroundColor: '#E6E6E6'}} value={notificationState} onChange={(e) => setNotificationState(e.target.value)}>
                                            <option value="Notify Before 5 mins">Notify Before 5 mins</option>
                                            <option value="Notify Before 15 mins">Notify Before 15 mins</option>
                                            <option value="Notify Before 30 mins">Notify Before 30 mins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row my-4">
                                <p className="font-weight-bold h4 pl-1" style={{color: '#857072'}}>Notification For</p>
                            </div>
               
                            <div className="form-row my-4"> 
                                <input type="radio" name="userType" value='Me' checked={userType === 'Me'} onChange={(e) => setUserType('Me')}/><label className="radio-inline px-2 h5 mr-2 mt-n2">Me</label>
                                <input type="radio" name="userType" value='Guardian' checked={userType === 'Guardian'} onChange={(e) => setUserType('Guardian')}/><label className="radio-inline px-2 h5 mr-2 mt-n2">Guardian</label>
                            </div>
                            <div className="row mt-5">
				                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                    <button type="submit" className="btn btn-lg btn-block rounded-pill text-light" style={{backgroundColor: '#0C0C52'}}>ADD</button>
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