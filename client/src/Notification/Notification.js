import React from 'react';
import Menu from '../shared/component/Menu'
import {Helmet} from "react-helmet";
import NotificationAlert from './NotificationAlert'
import Footer from '../shared/component/Footer'

const Notification = () => {
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
        <NotificationAlert/>
        <Footer/>
        </React.Fragment>;
};

export default Notification;