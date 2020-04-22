import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Doctor from '../shared/img/Dr.jpg';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import './Box.css'

const Box = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(true)

    const showLoginBox = () => {
        setIsLoginOpen(true)
    }

    const showRegisterBox = () => {
        setIsLoginOpen(false)
    }

    return  <div className="container-fluid w-100 h-100 full_div">
        {
            isLoginOpen?
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
            : <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
        }
        <br/>
        <br/>
        <div className="container shadow">
            <div className="row bg-white">
                <div className={"col-6 "+ (isLoginOpen? "loginDiv": "")}>
                    <a onClick={()=> showLoginBox()} className="text-dark" href="# ">
                        <p className="text-center font-weight-bold" style={{fontSize: '25px'}}>Login</p>
                    </a>
                </div>
                <div className={"col-6 "+ (isLoginOpen? "": "loginDiv")}>
                    <a onClick={()=>showRegisterBox()} className="text-dark" href="# ">
                        <p className="active text-center font-weight-bold" style={{fontSize: '25px'}}>Sign Up</p>
                    </a>
                </div>
            </div>
            <div className="row bg-white">
                <div className="col-lg-6 d-none d-lg-block">
                    <img className="w-100" src={Doctor} alt=""/>
                </div>
                <div className="col-lg-6">
                    {
                        isLoginOpen?
                        <LoginBox/>
                        : <RegisterBox showLoginBox={showLoginBox.bind(this)}/>
                    }
                </div>
            </div>
        </div>
        <br/>
        <br/>
    </div>;
}

export default Box;