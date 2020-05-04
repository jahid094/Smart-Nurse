import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import AddRoutine from './AddRoutine'
import MyRoutine from './MyRoutine'
import Footer from '../shared/component/Footer'
import './PatientRoutine.css'

const PatientRoutine = () => {
    const [userLoadingRoutine, setUserRoutine] = useState(false);
    return <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Patient Routine</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Patient Routine</p>
                </div>
            </div>
        </div>
        <AddRoutine/>
        <MyRoutine/>
        <Footer/>
        </React.Fragment>;
};

export default PatientRoutine;