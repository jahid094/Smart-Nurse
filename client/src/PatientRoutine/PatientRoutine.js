import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import PatientRoutineHead from './PatientRoutineHead'
import AddRoutine from './AddRoutine'
import MyRoutine from './MyRoutine'
import Footer from '../shared/component/Footer'

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
        <PatientRoutineHead/>
        <AddRoutine pageRender={pageRender.bind(this)}/>
        <MyRoutine renderPage={renderPage} pageRender={pageRender.bind(this)} pageNotRender={pageNotRender.bind(this)}/>
        <Footer/>
        </React.Fragment>;
};

export default PatientRoutine;