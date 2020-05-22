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
            const response = await axios.delete(process.env.REACT_APP_BACKEND_URL+'requestDelete/'+deleteId/*, {
                owner: auth.userId
            }*/);
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
                {isLoading && <LoadingSpinner asOverlay/>}
                {
                    props.notificationList ? 
                        <ul className="p-0">
                            {
                                props.notificationList.map((item, i) => {
                                    return <Alert style={{backgroundColor: '#EBEBEB', marginTop: '10px'}} key={i}>
                                        <i class="fas fa-circle" style={{backgroundColor: '#EBEBEB', padding: '10px'}}></i>{item.requesterName} wants to become your guardian
                                        <div class="btn-group float-right" role="group" aria-label="Basic example">
                                            <button class="btn" onClick={function() {acceptRequest(item.requester)}} disabled = {(disable)? "disabled" : ""}>
                                                <img src={Checkmark} style={{width: '22px', height: '22px'}} alt="CheckMark"/>
                                            </button>
                                            <button class="btn" onClick={function() {cancelRequest(item._id)}} disabled = {(disable)? "disabled" : ""}>
                                                <img src={Cross} style={{width: '16px', height: '16px'}} alt="Cross"/>
                                            </button>
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
			</div>
		</div>  
    </React.Fragment>;
};

export default NotificationAlert;