import {useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from '../shared/context/auth-context';

const VerifyUser = () => {
    const auth = useContext(AuthContext)
    const token = useParams().token;
    const history = useHistory()
    useEffect(() => {
        const verificationMethod = async () =>{
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'conformation/'+token);
                console.log(response.data.message)
                auth.authMessage = response.data.message
                // console.log(auth.authMessage)
                history.push('/login')
            } catch (error) {
                // console.log(error)
                auth.authMessage = error.response.data.message
                history.push('/login')
            }
        } 
        verificationMethod()
    })
    
    return  null;
}

export default VerifyUser;