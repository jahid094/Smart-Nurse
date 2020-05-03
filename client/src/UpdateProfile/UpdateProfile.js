import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import ProfileInformation from './ProfileInformation'
import './UpdateProfile.css'


const UpdateProfile = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Edit Profile</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Edit Profile</p>
                </div>
            </div>
        </div>
        <ProfileInformation/>
        <Footer/>
    </React.Fragment>;
}

export default UpdateProfile;