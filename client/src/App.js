import React, {useEffect, useContext} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main';
import {Cookies} from 'react-cookie';
import {AuthContext} from './shared/context/auth-context'
import './App.css';

const App = () => {
  const auth = useContext(AuthContext)
  const cookies = new Cookies()
  useEffect(() => {
    const token = new Cookies().get('token')
    console.log(token)
    if(token !== undefined){
      // console.log(token)
      const verifyToken = async () => { 
        try {
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'verifyCookie', {
              token
          });
          console.log(response.data);
          auth.userId = new Cookies().get('userId')
          auth.firstName = new Cookies().get('firstName')
          auth.token = token
          auth.isLoggedIn = true
        } catch (error) {
            console.log(error.response.data.message);
            auth.userId = null
            auth.firstName = null
            auth.token = null
            auth.isLoggedIn = false
            cookies.remove('userId', {path: '/'})
            cookies.remove('token', {path: '/'})
            cookies.remove('isLoggedIn', {path: '/'})
            cookies.remove('firstName', {path: '/'})
            cookies.remove('userRole', {path: '/'})
        }
      }
      verifyToken()
    } else {
      cookies.remove('userId', {path: '/'})
      cookies.remove('token', {path: '/'})
      cookies.remove('isLoggedIn', {path: '/'})
      cookies.remove('firstName', {path: '/'})
      cookies.remove('userRole', {path: '/'})
    }
  })
  return <Main/>;
}

export default App;