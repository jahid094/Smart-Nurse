import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import Menu from '../shared/component/Menu'
import {Helmet} from "react-helmet";
import NotificationAlert from './NotificationAlert'
import Footer from '../shared/component/Footer'
import {AuthContext} from '../shared/context/auth-context'

const Notification = () => {
    const auth = useContext(AuthContext)
    const [notificationList, setNotificationList] = useState([])
    // const [routineNotificationList, setRoutineNotificationList] = useState([])
    useEffect(() => {
        const getNotificationList = async () => { 
            try {
                // console.log('try')
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'users/requestList/'+auth.userId);
                setNotificationList(response.data.requestExist)
            } catch (error) {
                console.log('catch')
                // console.log(error.response.data);
            }
        }
        getNotificationList()
    })
    return <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Notification</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Notification</p>
                </div>
            </div>
        </div>
        {
            notificationList ?
                <NotificationAlert notificationList={notificationList} /*routineNotificationList={routineNotificationList}*//>
            :
            <NotificationAlert/>
        }
        <Footer/>
        </React.Fragment>;
};

export default Notification;