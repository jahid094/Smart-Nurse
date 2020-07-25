import React, {useState} from 'react';
import axios from 'axios'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import './RegisterBox.css'

const RegisterBox = props => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [userType, setUserType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [disable, setDisable] = useState(false)

    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'register', {
                firstname: firstName, 
                lastname: lastName,
                gender, 
                age, 
                email, 
                password, 
                password2: confirmPassword, 
                phone, 
                height, 
                weight, 
                userType});
            console.log(response.data);
            setIsLoading(false)
            setDisable(false)
            setSuccess(response.data.message)
            setFirstName('')
            setLastName('')
            setGender('')
            setAge('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setPhone('')
            setHeight('')
            setWeight('')
            setUserType('')
        } catch (error) {
            const map = error.response.data.message.errors
            const result = Object.values(map)
            setIsLoading(false)
            setDisable(false)
            setError(result[0].message || 'Something went wrong, please try again.')
        }
    }

    const errorHandler = () => {
        setError(null)
    }

    return  <React.Fragment>
        {error && <ErrorModal message={error} onClear={errorHandler.bind(this)}/>}
        {success && <ErrorModal message={success} onClear={errorHandler.bind(this)}/>}
        <div className="signup">
            {isLoading && <LoadingSpinner/>}
            <p className="text-center font-weight-bold" style={{fontSize: '25px', color: '#07074D'}}>Create Account</p>
            <form className="text-center" style={{color: '#757575'}} onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="First name" name="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="Last name" name="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="Gender" name="gender" value={gender} required onChange={(e) => setGender(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="Age" name="age" value={age} required onChange={(e) => setAge(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-6">
                        <input type="email" className="form-control text-left" placeholder="Email" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                    <div className="form-group col-6">
                        <input type="password" className="form-control text-left" placeholder="Password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-6">
                        <input type="password" className="form-control text-left" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                    <div className="form-group col-6">
                        <input type="tel" className="form-control text-left" placeholder="Phone Number" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                </div>         
                <div className="form-row">
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="Height" name="height" value={height} required onChange={(e) => setHeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                    <div className="form-group col-6">
                        <input type="text" className="form-control text-left" placeholder="Weight" name="weight" value={weight} required onChange={(e) => setWeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                    </div>
                </div>            
                {/* <div className="form-row justify-content-center">
                    <input type="radio" name="userType" value='Patient' checked={userType === 'Patient'} onChange={(e) => setUserType('Patient')} disabled = {(disable)? "disabled" : ""}/><label className="radio-inline radio_button">Patient</label>
                    <input type="radio" name="userType" value='Guardian' checked={userType === 'Guardian'} onChange={(e) => setUserType('Guardian')} disabled = {(disable)? "disabled" : ""}/><label className="radio-inline radio_button">Guardian</label>
                </div> */}
                <div className="row">
                    <div className="col-6 offset-3">
                    <button type="submit" className="btn-block btn text-white mt-3 p-2 justify-content-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52', fontSize: '20px'}} disabled = {(disable)? "disabled" : ""}>SIGN UP</button>
                    </div>	
                </div>
                <p style={{marginTop: '40px'}}><a onClick={() =>  {
                    props.showLoginBox()
                }} data-tab="login" className="login-tab text-dark" href="# ">I already have an account</a></p> 
            </form>
        </div>
    </React.Fragment>;
}

export default RegisterBox;