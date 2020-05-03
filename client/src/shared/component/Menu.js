import React, {useContext, useEffect} from 'react';
import {Navbar, NavDropdown} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import axios from 'axios'
import Logo from '../img/logo1.png'
import LoginButton from '../img/Login Button.png'
import './Menu.css'
import {AuthContext} from '../context/auth-context';

const Menu = () => {
    const auth = useContext(AuthContext)
    const cookies = new Cookies()
    const history = useHistory()

    useEffect(() => {
        const token = new Cookies().get('token')
        if(token !== undefined){
        //   console.log(token)
          const verifyUser = () => { 
              auth.userId = new Cookies().get('userId')
              auth.token = token
              auth.isLoggedIn = true
              auth.firstName = new Cookies().get('firstName')
              /* console.log('Menu.js')
              console.log('Login Status: '+auth.userId)
              console.log('Login Status: '+auth.token)
              console.log('Login Status: '+auth.isLoggedIn)
              console.log('Login Status: '+auth.firstName) */
          }
          verifyUser()
        }
    })

    const logoutHandler = async () => {
        console.log('test')
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'logout', {
                id: auth.userId
            });
            // const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'logout');
            console.log(response.data);
            auth.userId = null
            auth.firstName = null
            auth.token = null
            auth.isLoggedIn = false
            cookies.remove('userId', {path: '/'})
            cookies.remove('token', {path: '/'})
            cookies.remove('isLoggedIn', {path: '/'})
            cookies.remove('firstName', {path: '/'})
            /* console.log('Login Status: '+auth.userId)
            console.log('Login Status: '+auth.token)
            console.log('Login Status: '+auth.isLoggedIn) */
            history.push('/')
        } catch (error) {
            console.log(error);
            // setError(error.response.data.message || 'Something went wrong, please try again.')
        }
    }
    return  <Navbar bg="primary" className="my-nav" expand="lg" sticky="top">
        {/* {console.log('Nav'+auth.firstName)} */}
        <Navbar.Brand href="/">
            <img src={Logo} width="100" height="70" className="d-inline-block align-top" alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="fas fa-bars text-light"></i>
            {/* <Button>
                <i className="fas fa-bars"></i>
            </Button> */}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link text-light" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/">Service</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/">Contact</a>
                </li>
                {
                    auth.isLoggedIn?
                    <NavDropdown 
                    className="justify-content-center"
                    title={
                        <button type="button" className="btn bg-light p-1 dropdown-toggle rounded-pill" data-toggle="dropdown">Welcome {auth.firstName}
                            <i className="fa fa-angle-down"></i>
                        </button>
                    } id="basic-nav-dropdown">
                        <li>
                        <NavDropdown.Item className="d-flex justify-content-lg-center" href="/editProfile">
                            <button className="text-dark bg-white btn-lg-block p-1 rounded-pill text-decoration-none">Edit Profile</button>
                        </NavDropdown.Item>
                        </li>
                        <hr className="bg-white mx-3 mx-lg-4"/>
                        <NavDropdown.Item className="d-flex justify-content-lg-center">
                            <li>
                                <button className="btn-lg-block rounded-pill" onClick={logoutHandler}>Logout</button>
                            </li>
                        </NavDropdown.Item>
                    </NavDropdown>
                    : <li className="nav-item">
                        <a href="/login" className="mt-5" role="button" aria-pressed="true">
                            <img src={LoginButton} alt="" style={{marginLeft: '-20px', width: '110px', height: '45px'}}/>
                        </a>
                    </li>
                }
            </ul>
        </Navbar.Collapse>
    </Navbar>;
}

export default Menu;
