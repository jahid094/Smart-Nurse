import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import CreatePatientForm from './CreatePatientForm'
import './CreatePatient.css'

const CreatePatient = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Create Patient</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Create Patient Manually</p>
                </div>
            </div>
        </div>
        <CreatePatientForm/>
        <Footer/>
    </React.Fragment>;
};

export default CreatePatient;