import React, {useState,useContext} from 'react';
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import './AddRoutine.css'

/* eslint no-eval: 0 */

const AddRoutine = props => {
    const auth = useContext(AuthContext)
    const [routineItem, setRoutineItem] = useState('Medicine')
    const [itemName, setItemName] = useState('')
    const [unit, setUnit] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    // const [endDate, setEndDate] = useState(new Date(new Date().getTime()+(3*24*60*60*1000)))
    const [endDate, setEndDate] = useState(new Date())
    const [timesPerDay, setTimesPerDay] = useState(1)
    const [mealState, setMealState] = useState('Before Meal')
    const [time1, setTime1] = useState('10:00')
    const [time2, setTime2] = useState('11:00')
    const [time3, setTime3] = useState('12:00')
    const [time4, setTime4] = useState('13:00')
    const [time5, setTime5] = useState('14:00')
    const [notificationState, setNotificationState] = useState('Before 5 mins')
    const [userType, setUserType] = useState('Me')
    const [routineFormLoading, setRoutineFormLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault()
        setRoutineFormLoading(true)
        setDisable(true)
        /* console.log(routineItem)
        console.log(itemName)
        console.log(unit)
        console.log(moment(startDate).format('YYYY/MM/DD'))
        console.log(timesPerDay)
        console.log(mealState) */
        let times = [];
        let i
        for (i = 0; i < timesPerDay; i++) {
            // console.log("Time"+(i+1)+":"+eval('time'+(i+1)))
            times.push({
                time: eval('time'+(i+1))
            })
        }
        /* console.log("Time1:"+time1)
        console.log("Time2:"+time2)
        console.log("Time3:"+time3)
        console.log("Time4:"+time4)
        console.log("Time5:"+time5) */
        /* console.log(notificationState)
        console.log(userType)
        console.log(auth.userId)
        console.log(times) */
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
                setTime1('10:00')
                setTime2('11:00')
                setTime3('12:00')
                setTime4('13:00')
                setTime5('14:00')
                setNotificationState('Before 5 mins')
                setUserType('Me')
                setRoutineFormLoading(false)
                setDisable(false)
                setMessage(response.data.message)
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
                setTime1('10:00')
                setTime2('11:00')
                setTime3('12:00')
                setTime4('13:00')
                setTime5('14:00')
                setNotificationState('Before 5 mins')
                setUserType('Me')
                setRoutineFormLoading(false)
                setDisable(false)
                setMessage(response.data.message)
                props.pageRender()
            } catch (error) {
                setRoutineFormLoading(false)
                setDisable(false)
                setMessage(error.response.data.message)
            }
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
                            {/* </div> */}
               
                            {/* <div className="form-row mb-4"> */}
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
                            {/* </div> */}
              
                            {/* <div className="form-row mb-4"> */}
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
                                {routineFormLoading && <LoadingSpinner asOverlay/>}
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