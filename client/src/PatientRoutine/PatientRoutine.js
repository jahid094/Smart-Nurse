import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import AddRoutine from './AddRoutine'
import MyRoutine from './MyRoutine'
import Footer from '../shared/component/Footer'
import './PatientRoutine.css'

const PatientRoutine = () => {
    const [renderPage, setRenderPage] = useState(false)
    const pageRender = () => {
        setRenderPage(true)
    }

    const pageNotRender = () => {
        setRenderPage(false)
    }

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
        <AddRoutine pageRender={pageRender.bind(this)}/>
        <MyRoutine renderPage={renderPage} pageRender={pageRender.bind(this)} pageNotRender={pageNotRender.bind(this)}/>
        <Footer/>
        </React.Fragment>;
};

export default PatientRoutine;