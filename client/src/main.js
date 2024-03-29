import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/homepage'
import Login from './Login/Login'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import PasswordSetPatient from './PasswordSetPatient/PasswordSetPatient'
import VerifyUser from './VerifyUser/VerifyUser'
import PatientRoutine from './PatientRoutine/PatientRoutine'
import UpdateProfile from './UpdateProfile/UpdateProfile'
import CreatePatient from './CreatePatient/CreatePatient'
import AddPatient from './AddPatient/AddPatient'
import Notification from './Notification/Notification'
import {AuthContext} from './shared/context/auth-context'

const Main = () => {
    const auth = useContext(AuthContext)
    return <React.Fragment>
        {
            auth.isLoggedIn?
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/patientRoutine" component={PatientRoutine} exact/>
                <Route path="/editProfile" component={UpdateProfile} exact/>
                <Route path="/createPatient" component={CreatePatient} exact/>
                <Route path="/addPatient" component={AddPatient} exact/>
                <Route path="/notification" component={Notification} exact/>
                <Redirect to="/"></Redirect>
            </Switch>
            :          
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/forgetPassword" component={ForgetPassword} exact/>
                <Route path="/resetPassword/:token" component={ResetPassword} exact/>
                <Route path="/confirmation/:token" component={VerifyUser} exact/>
                <Route path="/setPasswordForNewPatient/:token" component={PasswordSetPatient} exact/>
                <Redirect to="/"></Redirect>
            </Switch>
        }
    </React.Fragment>
}

export default Main;