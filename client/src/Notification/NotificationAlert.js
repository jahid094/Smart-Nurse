import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import Checkmark from '../shared/img/checkmark.png'
import Cross from '../shared/img/Cross.png'
import Alert from 'react-bootstrap/Alert'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {AuthContext} from '../shared/context/auth-context'

const NotificationAlert = props => {
    const [routineNotificationList, setRoutineNotificationList] = useState([])
    useEffect(() => {
        const getNotificationList = async () => { 
            try {
                // console.log('try')
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routineNotification', {
                    owner: auth.userId
                });
                // console.log(response.data.routine)
                setRoutineNotificationList(response.data.routine)
            } catch (error) {
                console.log('catch')
                // console.log(error.response.data);
            }
          }
          getNotificationList()
    })
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const acceptRequest = async (requesterId) => {
        console.log('Accept'+requesterId)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'users/acceptRequest', {
                requester: requesterId,
                owner: auth.userId
            });
            setIsLoading(false)
            setDisable(false)
            setMessage(response.data.message)
            console.log(response.data.message)
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setMessage(error.response.data.message)
            console.log(error.response.data);
        }
    }
    const cancelRequest = async (deleteId) => {
        console.log('Cancel'+deleteId)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.delete(process.env.REACT_APP_BACKEND_URL+'requestDelete/'+deleteId);
            setIsLoading(false)
            setDisable(false)
            setMessage(response.data.message)
            console.log(response.data)
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setMessage(error.response.data.message)
            console.log(error.response.data);
        }
    }

    const acceptRoutine = async (id, time) => {
        console.log('Accept Routine'+id)
        console.log('Accept Routine'+time)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'acceptRoutine', {
                id,
                time
            });
            setIsLoading(false)
            setDisable(false)
            setMessage(response.data.message)
            console.log(response.data)
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setMessage(error.response.data.message)
            console.log(error.response.data);
        }
    }

    const cancelRoutine = async (id, time) => {
        console.log('Cancel Routine'+id)
        console.log('Cancel Routine'+time)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'cancelRoutine', {
                id,
                time
            });
            setIsLoading(false)
            setDisable(false)
            setMessage(response.data.message)
            console.log(response.data)
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setMessage(error.response.data.message)
            console.log(error.response.data);
        }
    }

    const messageHandler = () => {
        setMessage(null)
    }

    const timeFormat = (timeString) => {
        var time = timeString.split(':');
        var hour = time[0] % 12 || 12;
        var minute = time[1];
        var ampm = (time[0] < 12 || time[0] === 24) ? "AM" : "PM";
        return hour+':'+minute + ampm;
    }

    return <React.Fragment>
        <div className="container-fluid">
            <div className="container">
                {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
                {isLoading && <LoadingSpinner/>}
                <p className="h5 mb-4">Patient Request</p>
                {
                    props.notificationList ? 
                        <ul className="p-0">
                            {
                                props.notificationList.map((item, i) => {
                                    return <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}} key={i}>
                                        <i className="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>{item.requesterName} wants to become your guardian
                                        <div className="btn-group float-md-right" role="group" aria-label="Basic example">
                                            <div className="row ml-2 ml-sm-0">
                                                <div className="col-12" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>
                                                    <button className="btn-block btn text-white" onClick={function() {acceptRequest(item.requester)}} disabled = {(disable)? "disabled" : ""}>
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row ml-4 ml-sm-4 mr-sm-1 ml-md-4 mr-md-1">
                                                <div className="col-12 bg-danger" style={{borderRadius: '1em'}}>
                                                    <button className="btn-block btn text-white" onClick={function() {cancelRequest(item._id)}} disabled = {(disable)? "disabled" : ""}>
                                                    Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Alert>;
                                })
                            }
                        </ul>
                    :
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                        <i className="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have no Notification.
                    </Alert>
                }
                <p className="h5 mt-4 mb-4">Daily Routine</p>
                {
                    routineNotificationList ? 
                        <ul className="p-0">
                            {
                                routineNotificationList.map((item, i) => {
                                    return <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}} key={i}>
                                        <i className="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece {item.notificationArray.itemName} tablet at {timeFormat(item.notificationTime.time)}.
                                        <div className="btn-group float-right" role="group" aria-label="Basic example">
                                            <button className="btn" onClick={function() {acceptRoutine(item.notificationArray._id, item.notificationTime.time)}} disabled = {(disable)? "disabled" : ""}>
                                                <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                                            </button>
                                            <button className="btn" onClick={function() {cancelRoutine(item.notificationArray._id, item.notificationTime.time)}} disabled = {(disable)? "disabled" : ""}>
                                                <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                                            </button>
                                        </div>
                                    </Alert>;
                                })
                            }
                        </ul>
                    :
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                        <i className="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have no Notification.
                    </Alert>
                }
			</div>
		</div>  
    </React.Fragment>;
};

export default NotificationAlert;