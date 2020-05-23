import React, {useState, useContext, useEffect} from 'react';
import ProfilePic from '../shared/img/profile pic.png';
import axios from 'axios'
import {AuthContext} from '../shared/context/auth-context';
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {Cookies} from 'react-cookie';

const ProfileInformation = () => {
    const auth = useContext(AuthContext)
    const cookies = new Cookies()
    const [imageFile, setImageFile] = useState(ProfilePic)
    const [profileimageFile, setProfileImageFile] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const getUserData = async () => { 
            setIsLoading(true)
            setDisable(true)
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/me', {
                    id: auth.userId
                });
                setFirstName(response.data.user.firstname)
                setLastName(response.data.user.lastname)
                setAge(response.data.user.age)
                setWeight(response.data.user.weight)
                setHeight(response.data.user.height)
                setPhone(response.data.user.phone)
                setEmail(response.data.user.email)
                if(response.data.profilePicture){
                    setImageFile("data:image/png;base64,"+response.data.profilePicture)
                    setProfileImageFile("data:image/png;base64,"+response.data.profilePicture)
                }
                setIsLoading(false)
                setDisable(false)
            } catch (error) {
                setIsLoading(false)
                setDisable(false)
                setMessage(error.response.data.message)
            }
          }
          getUserData()        
    }, [auth.userId])

    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setDisable(true)
        if(!currentPassword){
            try {
                const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'users/me', {
                    firstname: firstName,
                    lastname: lastName,
                    age,
                    weight,
                    height,
                    phone,
                    newPassword: newPassword,
                    confirmPassword: confirmNewPassword,
                    id: auth.userId
                });
                setIsLoading(false)
                setDisable(false)
                setMessage(response.data.message)
                auth.firstName = firstName
                cookies.set('firstName', auth.firstName, { path: '/', maxAge: 31536000 });
            } catch (error) {
                setIsLoading(false)
                setDisable(false)
                setMessage(error.response.data.message)
            }
        } else {
            setIsLoading(true)
            setDisable(true)
            try {
                const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'users/me', {
                    firstname: firstName,
                    lastname: lastName,
                    age,
                    weight,
                    height,
                    phone,
                    password: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmNewPassword,
                    id: auth.userId
                });
                setCurrentPassword('')
                setNewPassword('')
                setConfirmNewPassword('')
                setIsLoading(false)
                setDisable(false)
                setMessage(response.data.message)
            } catch (error) {
                setIsLoading(false)
                setDisable(false)
                setMessage(error.response.data.message)
            }
        }
    }

    const messageHandler = () => {
        setMessage(null)
    }

    return  <div className="container-fluid">
        {isLoading && <LoadingSpinner/>}
        {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
        <div className="row">
            <div className="col-lg-4">
                <img className="d-block mx-auto rounded-circle" style={{width: '250px', height: '250px'}} src={imageFile} alt="Profile"/>
                    <div className="col-6 offset-3 col-lg-8 offset-lg-2">
                        <form>
                        <label htmlFor="files" className="btn btn-block text-white mx-auto mt-3 rounded-pill justify-content-center" style={{backgroundColor: '#0C0C52'}}>Change Profile Picture</label>
                        <input id="files" style={{visibility: 'hidden'}} type="file" onChange={async (e) =>  {
                                setImageFile(URL.createObjectURL(e.target.files[0]))
                                var formData = new FormData();
                                formData.append("updatepp", e.target.files[0]);
                                formData.append("id", auth.userId);
                                try {
                                    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/profilePicture', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    });
                                    setMessage(response.data.message)
                                } catch (error) {
                                    setMessage(error.response.data.message)
                                    setImageFile(profileimageFile)
                                }
                            }
                        }/>
                        </form>
                    </div>
            </div>
            <div className="col-lg-8">
                <div className="container">
                    <br/>
                    <br/>
                    <h3>General Information:</h3>
                    <br/>
                    <form onSubmit={submitHandler}>
                        <div className="form-row">
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="First Name" name="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="lastname">Last name</label>
                                <input type="text" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Last Name" name="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                        </div>
                        <br/>
                        <div className="form-row">
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="age">Age</label>
                                <input type="text" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Age" name="age" value={age} required onChange={(e) => setAge(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="weight">Weight</label>
                                <input type="text" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Weight" name="weight" value={weight} required onChange={(e) => setWeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                        </div>
                        <br/>
                        <div className="form-row">
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="height">Height</label>
                                <input type="text" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Height" name="height" value={height} required onChange={(e) => setHeight(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="form-group col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="address">Phone</label>
                                <input type="tel" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Phone" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <h3>Account Information:</h3>
                        <br/>
                        <div className="row">
                            <div className="col-8 offset-2 col-lg-5 offset-lg-0">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="Enter your mail" name="email" value={email} disabled/>
                            </div>
                            <div className="col-lg-6"></div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <h3>Change Password:</h3>
                        <br/>
                        <div className="row">
                            <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                                <label htmlFor="currentpassword">Current Password</label>
                                <input type="password" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="At Least 6 Characters" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                                <label htmlFor="password">New Password</label>
                                <input type="password" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="At Least 6 Characters" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                                <label htmlFor="confirmnewpassword">Confirm New Password</label>
                                <input type="password" className="form-control rounded-pill text-justify" style={{backgroundColor: '#E6E6E6'}} placeholder="At Least 6 Characters" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            </div>
                            <div className="col-8 offset-2 col-lg-4 offset-lg-3">
                                <button type="submit" className="btn btn-block text-white mx-auto mt-5 rounded-pill" style={{backgroundColor: '#0C0C52'}}>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>;
}

export default ProfileInformation;