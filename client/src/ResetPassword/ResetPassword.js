import React, {useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../shared/context/auth-context';
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {Helmet} from "react-helmet";
import Nurse from '../shared/img/Nurse.png';
import './ResetPassword.css'

const ResetPassword = () => {
    const auth = useContext(AuthContext)
    const token = useParams().token;
    const history = useHistory()
    const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [disable, setDisable] = useState(false)
	const submitHandler = async (event) => {
		event.preventDefault()
		/* console.log(password)
        console.log(confirmPassword) */
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'reset/'+token, {
				password,
				confirm: confirmPassword
            });
            setIsLoading(false)
            setDisable(false)
            console.log(response.data);
            auth.resetMessage = response.data.message
            history.push('/login')
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
        <div className="containder-fluid  full_div">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>
			<br/>
			<br/>
			<br/>
            {error && <ErrorModal message={error} onClear={errorHandler.bind(this)}/>}
            {isLoading && <LoadingSpinner asOverlay/>}
			<div className="container box">
				<div className="row" >
					<div className="col-lg-6 d-none d-lg-block">
                        <img className="w-100 p-5" src={Nurse} alt="Smart Nurse"/>
					</div>
					<div className="col-lg-6">
						<p className="display-4 font-weight-bold text-center mt-5 text-color" style={{color: '#000066'}}>Reset Password</p>
						<br/>
						<h4 className="text-center mt-3 text-color">Enter your new password</h4>
						<br/>
						<br/>	
                        <form onSubmit={submitHandler}>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2">
                                        <input type="password" className="form-control" name="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>	
                                    </div>
                                </div>
                            </div>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2">
                                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>	
                                    </div>
                                </div>
                            </div>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-6 offset-3">
										<button type="submit" className="btn-block btn btn-lg text-white mt-3" style={{borderRadius: '1em', backgroundColor:'#0C0C52'}} disabled = {(disable)? "disabled" : ""}>RESET</button>	
                                    </div>
                                </div>
                            </div>
						</form>
					</div>
				</div>
			</div>
		</div>
    </React.Fragment>;
}

export default ResetPassword;