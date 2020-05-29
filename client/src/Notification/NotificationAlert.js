import React, {useState, useContext} from 'react';
import axios from 'axios'
import Checkmark from '../shared/img/checkmark.png'
import Cross from '../shared/img/Cross.png'
import Alert from 'react-bootstrap/Alert'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {AuthContext} from '../shared/context/auth-context'

const NotificationAlert = props => {
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [show3, setShow3] = useState(true);
    const [show4, setShow4] = useState(true);
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

    const messageHandler = () => {
        setMessage(null)
    }

    return <React.Fragment>
        <div class="container-fluid">
            <div class="container">
                {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
                {isLoading && <LoadingSpinner/>}
                <p className="h5 mb-4">Patient Request</p>
                {
                    props.notificationList ? 
                        <ul className="p-0">
                            {
                                props.notificationList.map((item, i) => {
                                    return <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}} key={i}>
                                        <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>{item.requesterName} wants to become your guardian
                                        <div class="btn-group float-md-right" role="group" aria-label="Basic example">
                                            <div className="row ml-2 ml-sm-0">
                                                <div className="col-12" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>
                                                    <button class="btn-block btn text-white" onClick={function() {acceptRequest(item.requester)}} disabled = {(disable)? "disabled" : ""}>
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row ml-4 ml-sm-4 mr-sm-1 ml-md-4 mr-md-1">
                                                <div className="col-12 bg-danger" style={{borderRadius: '1em'}}>
                                                    <button class="btn-block btn text-white" onClick={function() {cancelRequest(item._id)}} disabled = {(disable)? "disabled" : ""}>
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
                        <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have no Notification.
                    </Alert>
                }
                <p className="h5 mt-4 mb-4">Daily Routine</p>
                {
                    show ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                        <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                        <div class="btn-group float-md-right" role="group" aria-label="Basic example">
                            <div className="row ml-2 ml-sm-0">
                                <div className="col-12" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>
                                    <button class="btn-block btn text-white" onClick={() => setShow(false)}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                            <div className="row ml-4 ml-sm-4 mr-sm-1 ml-md-4 mr-md-1">
                                <div className="col-12 bg-danger" style={{borderRadius: '1em'}}>
                                    <button class="btn-block btn text-white" onClick={() => setShow(false)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Alert>
                    :
                    null
                }
                {
                    show1 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to eat 2 apples at 7 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow1(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow1(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show2 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to walk for 45 mins at 5 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow2(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow2(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show3 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow3(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow3(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
                {
                    show4 ?
                    <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}}>
                    <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>You have to take 1 piece Napa tablet at 8:00 PM.
                    <div class="btn-group float-right" role="group" aria-label="Basic example">
                        <button class="btn " data-dismiss="alert" onClick={() => setShow4(false)}>
                            <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                        </button>
                        <button class="btn " data-dismiss="alert" onClick={() => setShow4(false)}>
                            <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                        </button>
                    </div>
                    </Alert>
                    :
                    null
                }
			</div>
		</div>  
    </React.Fragment>;
};

export default NotificationAlert;