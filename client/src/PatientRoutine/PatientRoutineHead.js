import React, {useEffect} from 'react';
import './PatientRoutineHead.css'

const PatientRoutineHead = () => {
    useEffect(() => {
        console.log('Effect in head')
    })
    return <React.Fragment>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Patient Routine</p>
                </div>
            </div>
        </div> 
        </React.Fragment>;
};

export default PatientRoutineHead;