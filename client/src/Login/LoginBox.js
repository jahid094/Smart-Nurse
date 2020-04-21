import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import Logo from '../shared/img/logo.png'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {AuthContext} from '../shared/context/auth-context'

const LoginBox = () => {
    const auth = useContext(AuthContext)
    const cookies = new Cookies();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        /* console.log('Login')
        console.log(auth.authMessage) */
    })
        
    const submitHandler = async (event) => {
        event.preventDefault()
        /* console.log('Login Status: '+auth.userId)
        console.log('Login Status: '+auth.token)
        console.log('Login Status: '+auth.isLoggedIn) */
        console.log(email)
        console.log(password)
        /* axios.post('https://ratul-place-sharing-app.herokuapp.com/api/users/login', {
            email,
            password
        }).then((responese) => {
            console.log(responese.data)
        }).catch((error) => {
            console.log(error)
        }) */
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'login', {
                email,
                password
            });
            setIsLoading(false)
            setDisable(false)
            console.log(response.data);
            auth.userId = response.data.user._id
            auth.token = response.data.Token
            auth.isLoggedIn = true
            auth.firstName = response.data.user.firstname
            cookies.set('userId', auth.userId, { path: '/', maxAge: 31536000 });
            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
            cookies.set('isLoggedIn', auth.isLoggedIn, { path: '/', maxAge: 31536000 });
            cookies.set('firstName', auth.firstName, { path: '/', maxAge: 31536000 });
            /* console.log('Login Status: '+auth.userId)
            console.log('Login Status: '+auth.token)
            console.log('Login Status: '+auth.isLoggedIn) */
            history.push('/')
        } catch (error) {
            // console.log(error.response.data.message);
            setIsLoading(false)
            setDisable(false)
            setError(error.response.data.message || 'Something went wrong, please try again.')
        }
    }

    const errorHandler = () => {
        setError(null)
        auth.authMessage = null
        auth.resetMessage = null
    }

    return  <React.Fragment>
            {auth.authMessage && <ErrorModal message={auth.authMessage} onClear={errorHandler.bind(this)}/>}
            {auth.resetMessage && <ErrorModal message={auth.resetMessage} onClear={errorHandler.bind(this)}/>}
            {error && <ErrorModal message={error} onClear={errorHandler.bind(this)}/>}
            <div className="login" id="loginBox">
                {isLoading && <LoadingSpinner asOverlay/>}
                <img className="mx-auto d-block" src={Logo} alt=""/>
                <p className="text-center font-weight-bold" style={{fontSize:'25px', marginTop: '50px'}}>Member Login</p>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-3">          
                            </div>
                            <div className="col-6">
                                <span className="fa fa-envelope icon d-block text-center" style={{position: 'absolute', zIndex: 2, width: '2.375rem', height: '2.375rem', lineHeight: '2.375rem', pointerEvents: 'none', color: '#aaa'}}></span>
                                <input className="form-control text-left" type="email" placeholder="Email" name="email" style={{borderRadius: '1em', backgroundColor: '#E6E6E6', paddingLeft: '50px'}} value={email} required onChange={(e) => setEmail(e.target.value)} disabled = {(disable)? "disabled" : ""}/> 
                            </div>
                            <div className="col-3">          
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-3">          
                            </div>
                            <div className="col-6">
                                <span className="fa fa-key icon d-block text-center" style={{position: 'absolute', zIndex: 2, width: '2.375rem', height: '2.375rem', lineHeight: '2.375rem', pointerEvents: 'none', color: '#aaa'}}></span>
                                <input className="form-control text-left" type="password" placeholder="Password" name="password" style={{borderRadius: '1em', backgroundColor: '#E6E6E6', paddingLeft: '50px'}} value={password} required onChange={(e) => setPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="col-3">    
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-3">          
                        </div>
                        <div className="col-6">
                            <button type="submit" className="btn btn-lg btn-block text-white" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled = {(disable)? "disabled" : ""}>LOGIN</button>
                        </div>
                        <div className="col-3">          
                        </div>
                    </div>
                    <div className="form-group">
                        <p style={{marginTop: '40px'}} className="text-center">
                        <a className="text-dark" href="/forgetPassword">
                            Forgot Password</a></p>
                    </div>
                </form>
            </div>
        </React.Fragment>;
}

export default LoginBox;