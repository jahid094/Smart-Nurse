import React, {useState, useEffect} from 'react';
import './PatientRoutineHead.css'
import {Cookies} from 'react-cookie';
import ApiCalendar from './ApiCalendar'

const PatientRoutineHead = () => {
    const [seconds, setSeconds] = useState(0);
    const [sign, setSign] = useState(ApiCalendar.sign)
    const cookies = new Cookies()
    useEffect(() => {
        console.log(seconds)
        if(seconds <= 3){
            ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(signUpdate());
            });
            if(seconds === 2){
                const signStatus = async () => {
                    console.log(sign)
                    // console.log(new Cookies().get('googleSignIn').localeCompare("false"))
                    if(new Cookies().get('googleSignIn').localeCompare("false") === 0){
                        console.log('if')
                        console.log('Sign Status in if:'+ApiCalendar.sign)
                        await ApiCalendar.handleAuthClick();
                        cookies.set('googleSignIn', ApiCalendar.sign, { path: '/', maxAge: 31536000 });
                        console.log('Sign Status in if after:'+ApiCalendar.sign)
                    }
                }
                signStatus()
                console.log('Sign Status outside if:'+ApiCalendar.sign)
                cookies.set('googleSignIn', ApiCalendar.sign, { path: '/', maxAge: 31536000 });
            }
            if(seconds === 3){
                if(ApiCalendar.sign){
                    cookies.set('googleSignIn', true, { path: '/', maxAge: 31536000 });
                }
            }
            const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    useEffect(() => {
        console.log('Sign Status:'+ApiCalendar.sign)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ApiCalendar.sign]);

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