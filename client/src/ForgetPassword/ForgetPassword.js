import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import Nurse from '../shared/img/Nurse.png';
import './ForgetPassword.css'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [disable, setDisable] = useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'forgot', {
                email
            });
            setIsLoading(false)
            setDisable(false)
            // console.log(response.data);
            setSuccess(response.data.message)
        } catch (error) {
            // console.log(error.response.data.message);
            setIsLoading(false)
            setDisable(false)
            setError(error.response.data.message || 'Something went wrong, please try again.')
        }
    }
    const errorHandler = () => {
        setError(null)
    }
    return <React.Fragment>
        {error && <ErrorModal message={error} onClear={errorHandler.bind(this)}/>}
        {success && <ErrorModal message={success} onClear={errorHandler.bind(this)}/>}
        <div className="containder-fluid w-100 h-100 full_div">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
            </Helmet>
            <br/>
            <br/>
            <br/>
            {isLoading && <LoadingSpinner asOverlay/>}
            <div className="container box">  
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block">
                        <img className="w-100 p-5" src={Nurse} alt="Smart Nurse"/>
                    </div>
                    <div className="col-lg-6">
                        <p className="display-4 font-weight-bold text-center mt-5 text-color">Forgot Password</p>
                        <h5 className="text-center mt-5 text-color">Enter the email address associated</h5>
                        <h5 className="text-center mt-2 text-color">with your account</h5>
                        <h6 className="text-center mt-4 text-color">We will email you a link to reset </h6>
                        <h6 className="text-center mt-1 text-color"> your password</h6>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-6 offset-3">
                                        <input type="email" className="form-control" name="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} disabled = {(disable)? "disabled" : ""}/>	
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-4 offset-4">
                                        <button type="submit" className="btn-block btn text-white mt-3 justify-content-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled = {(disable)? "disabled" : ""}>SEND</button>	
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br/>
                        <br/>
                    </div>    
                </div>    
            </div> 
            <br/>
            <br/>
            <br/>
        </div>
    </React.Fragment>;
}

export default ForgetPassword;