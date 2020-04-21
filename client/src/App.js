import React, {useEffect, useContext} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main';
import {Cookies} from 'react-cookie';
import {AuthContext} from './shared/context/auth-context'
import './App.css';

const App = () => {
  const auth = useContext(AuthContext)
  useEffect(() => {
    const token = new Cookies().get('token')
    if(token !== undefined){
      // console.log(token)
      const verifyToken = async () => { 
        try {
          await axios.post(process.env.REACT_APP_BACKEND_URL+'verifyCookie', {
              token
          });
          // console.log(response.data);
          auth.userId = new Cookies().get('userId')
          auth.firstName = new Cookies().get('firstName')
          auth.token = token
          auth.isLoggedIn = true
          /* console.log('Login Status: '+auth.userId)
          console.log('Login Status: '+auth.token)
          console.log('Login Status: '+auth.isLoggedIn) */
        } catch (error) {
            console.log(error.response.data.message);
        }
      }
      verifyToken()
    }
  })
  return <Main/>;
}

export default App;