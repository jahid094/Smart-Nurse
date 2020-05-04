import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import './AddPatient.css'

const AddPatient = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Add Patient</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Add Patient</p>
                </div>
            </div>
        </div>
        <h1>Search with the UserId and add your patient</h1>
        <Footer/>
    </React.Fragment>;
};

export default AddPatient;