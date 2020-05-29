import React, {useContext, useEffect, useState} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import axios from 'axios'
import Logo from '../img/logo1.png'
import NotificationIcon from '../img/Notification Icon.png'
import LoginButton from '../img/Login Button.png'
import './Menu.css'
import ApiCalendar from '../../PatientRoutine/ApiCalendar'
import { Link, animateScroll as scroll } from "react-scroll";
import {AuthContext} from '../context/auth-context';

const Menu = () => {
    const auth = useContext(AuthContext)
    const cookies = new Cookies()
    const history = useHistory()
    const [seconds, setSeconds] = useState(0);
    const [sign, setSign] = useState(ApiCalendar.sign)
    useEffect(() => {
        console.log(seconds)
        if(seconds <= 2){
            ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(signUpdate());
            });
            if(seconds === 2){
                const signStatus = async () => {
                    console.log(sign)
                }
                signStatus()
            }
            const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    const signUpdate = () => {
        setSign(ApiCalendar.sign)
    }

    useEffect(() => {
        const token = new Cookies().get('token')
        if(token !== undefined){
            const verifyUser = () => { 
              auth.userId = new Cookies().get('userId')
              auth.token = token
              auth.isLoggedIn = true
              auth.firstName = new Cookies().get('firstName')
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
            console.log(response.data);
            auth.userId = null
            auth.firstName = null
            auth.token = null
            auth.isLoggedIn = false
            cookies.remove('userId', {path: '/'})
            cookies.remove('token', {path: '/'})
            cookies.remove('isLoggedIn', {path: '/'})
            cookies.remove('firstName', {path: '/'})
            history.push('/')
            const logoutFromGoogle = () => {
                if(sign){
                    ApiCalendar.handleSignoutClick();
                }
            }
            await logoutFromGoogle()
        } catch (error) {
            console.log(error);
        }
    }

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    return  <Navbar bg="primary" className="my-nav" expand="lg" sticky="top">
        {
            window.location.pathname === '/' ?
            <Navbar.Brand>
                <img src={Logo} width="100" height="70" className="d-inline-block align-top" alt="Logo" onClick={function(){scrollToTop()}}/>
            </Navbar.Brand>
            :
            <Navbar.Brand href="/">
                <img src={Logo} width="100" height="70" className="d-inline-block align-top" alt="Logo"/>
            </Navbar.Brand>
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="fas fa-bars text-light"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav ml-auto">
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Home</Nav.Link>
                </Nav.Item>
                {
                    window.location.pathname === '/' ?
                    <React.Fragment>
                        <Nav.Item>
                            <Link className="nav-link text-light" to="service" spy={true} smooth={true} offset={-70} duration={500} style={{cursor: 'pointer'}}>Service</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-light" to="about" spy={true} smooth={true} offset={-70} duration={500} style={{cursor: 'pointer'}}>About</Link>
                        </Nav.Item>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Nav.Item>
                            <Nav.Link className="text-light" href="/#service">Service</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-light" href="/#about">About</Nav.Link>
                        </Nav.Item>
                    </React.Fragment>
                }
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Contact</Nav.Link>
                </Nav.Item>
                {
                    auth.isLoggedIn?
                    <React.Fragment>
                        <Nav.Item className="mt-lg-n1">
                            <Nav.Link className="text-light" href="/notification">
                                <img className="mr-2" src={NotificationIcon} style={{width: '35px', height: '35px'}} alt="Notification Icon"/>
                                <span className="badge rounded-circle bg-light position-relative ml-n4 badge-notify">5</span>
                            </Nav.Link>
                        </Nav.Item>
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
                    </React.Fragment>
                    : <Nav.Item>
                        <a href="/login" className="mt-5" role="button" aria-pressed="true">
                            <img src={LoginButton} alt="" style={{marginLeft: '-20px', width: '110px', height: '45px'}}/>
                        </a>
                    </Nav.Item>
                }
            </ul>
        </Navbar.Collapse>
    </Navbar>;
}

export default Menu;
