import {createContext} from 'react';
import {Cookies} from 'react-cookie';

export const AuthContext = createContext({
    isLoggedIn: new Cookies().get('isLoggedIn') || false,
    userId: new Cookies().get('userId') || null,
    token: new Cookies().get('token') || null,
    firstName: new Cookies().get('firstName') || null,
    authMessage: null,
    resetMessage: null,
    userRole: new Cookies().get('userRole') || null,
})