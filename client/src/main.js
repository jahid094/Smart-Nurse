import React, {useEffect, useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/homepage'
import Login from './Login/Login'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import VerifyUser from './VerifyUser/VerifyUser'
import {AuthContext} from './shared/context/auth-context'

const Main = () => {
    const auth = useContext(AuthContext)
    useEffect(() => {
        // console.log('Main.js')
        // console.log(auth.isLoggedIn)
    })

    return <React.Fragment>
        {
            auth.isLoggedIn?
            <Switch>
                <Route path="/" component={HomePage} exact/>
            <Redirect to="/"></Redirect>
            </Switch>
            :          
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/forgetPassword" component={ForgetPassword} exact/>
                <Route path="/resetPassword/:token" component={ResetPassword} exact/>
                <Route path="/confirmation/:token" component={VerifyUser} exact/>
                <Redirect to="/"></Redirect>
            </Switch>
        }
        {/* <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/forgetPassword" component={ForgetPassword} exact/>
            <Route path="/resetPassword/:token" component={ResetPassword} exact/>
            <Route path="/confirmation/:token" component={VerifyUser} exact/>
            <Redirect to="/"></Redirect>
        </Switch> */}
    </React.Fragment>
}

export default Main;