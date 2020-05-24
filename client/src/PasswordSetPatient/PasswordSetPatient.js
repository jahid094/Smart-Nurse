import React, {useState, useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../shared/context/auth-context';
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {Helmet} from "react-helmet";
import Doctor from '../shared/img/Dr.jpg';
import './PasswordSetPatient.css'

const PasswordSetPatient = () => {
    const auth = useContext(AuthContext)
    const token = useParams().token;
    const history = useHistory()
    const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [disable, setDisable] = useState(false)
    useEffect(() => {
        const verificationMethod = async () =>{
            try {
                await axios.get(process.env.REACT_APP_BACKEND_URL+'conformation/request/'+token);
            } catch (error) {
                console.log(error.response.data.message)
                auth.resetMessage = error.response.data.message
                history.push('/login')
            }
        } 
        verificationMethod()
    })
	const submitHandler = async (event) => {
		event.preventDefault()
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'conformation/request/'+token, {
				password,
				confirm: confirmPassword
            });
            setIsLoading(false)
            setDisable(false)
            console.log(response.data);
            auth.resetMessage = response.data.message
            history.push('/login')
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setError(error.response.data.message || 'Something went wrong, please try again.')
        }
    }
    const errorHandler = () => {
        setError(null)
    }
    return <React.Fragment>
        <div className="containder-fluid w-100 h-100 full_div">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Set Password</title>
            </Helmet>
			<br/>
			<br/>
			<br/>
            {error && <ErrorModal message={error} onClear={errorHandler.bind(this)}/>}
            {isLoading && <LoadingSpinner/>}
			<div className="container box">
				<div className="row">
					<div className="col-lg-6 d-none d-lg-block">
                        <img className="w-100 p-5" src={Doctor} alt="Smart Nurse"/>
					</div>
					<div className="col-lg-6">
						<p className="display-4 font-weight-bold text-center mt-5 text-color" style={{color: '#000066'}}>Set Password</p>
						<br/>
						<h4 className="text-center mt-3 text-dark">Enter your new password</h4>
						<br/>
						<br/>	
                        <form onSubmit={submitHandler}>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2 mb-3">
                                        <input type="password" className="form-control" name="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>	
                                    </div>
                                </div>
                            </div>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2 mb-3">
                                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>	
                                    </div>
                                </div>
                            </div>
							<div className="form-group">
                                <div className="form-row">
                                    <div className="col-6 offset-3">
										<button type="submit" className="btn-block btn btn-lg text-white mt-3" style={{borderRadius: '1em', backgroundColor:'#0C0C52'}} disabled = {(disable)? "disabled" : ""}>SET PASSWORD</button>	
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

export default PasswordSetPatient;