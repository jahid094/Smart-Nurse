import React, {useState, useEffect} from 'react';
import './PatientRoutineHead.css'
import ApiCalendar from './ApiCalendar'

const PatientRoutineHead = () => {
    const [seconds, setSeconds] = useState(0);
    const [sign, setSign] = useState(ApiCalendar.sign)
    useEffect(() => {
        console.log(seconds)
        if(seconds <= 2){
            ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(signUpdate());
            });
            if(seconds === 2){
                const signStatus = async () => {
                    console.log(sign)
                    if(!sign){
                        console.log('if')
                        await ApiCalendar.handleAuthClick();
                    }
                }
                signStatus()
            }
            const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [seconds]);

    const signUpdate = () => {
        setSign(ApiCalendar.sign)
    }
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