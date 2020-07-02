import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import AddPatientTable from './AddPatientTable'
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import './AddPatient.css'

const AddPatient = () => {
    const auth = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState([])
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const getUserList = async () => { 
            setIsLoading(true)
            setDisable(true)
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/userList', {
                    owner: auth.userId
                });
                setIsLoading(false)
                setDisable(false)
                setUserList(response.data.user)
                console.log(response.data)
            } catch (error) {
                setIsLoading(false)
                setDisable(false)
                console.log(error.response.data);
            }
          }
          getUserList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(search){
            setFilteredUserList(
                userList.filter(user =>
                   user.firstname.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredUserList([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const addMyselfAsPatient = async () => {
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL+'addPatientMyself', {
                id: auth.userId 
            });
            setIsLoading(false)
            setDisable(false)
            setMessage(response.data.message)
            console.log(response.data);
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            setMessage(error.response.data.message)
            console.log(error.response.data);
        }
    }

    const messageHandler = () => {
        setMessage(null)
    }

    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Add Patient</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light display-4">Add Patient</p>
                </div>
            </div>
        </div>
        <div className="container-fluid w-100 h-100">
            <div className="container">
                {isLoading && <LoadingSpinner/>}
                {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
                <div className="row text-center mb-4">
                    <div className="col-10 col-sm-6 col-lg-4 offset-1 offset-sm-3 offset-lg-4">
                        <button className='btn btn-lg btn-block text-white' style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} onClick={function() {addMyselfAsPatient()}}>Add Me As A Patient</button>
                    </div>
                </div>
                <div className="row">
                    <p className="h1 font-weight-normal ml-3">Search with the UserId and add your patient</p>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="input-group">
                            <input className="form-control py-2 rounded-pill mr-1 pr-5" type="search" placeholder="Patient ID" onChange={e => setSearch(e.target.value)} disabled = {(disable)? "disabled" : ""}/>
                            <span className="input-group-append">
                                <button className="btn rounded-pill border-0 ml-n5" type="button" disabled = {(disable)? "disabled" : ""}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddPatientTable userList={filteredUserList}/>
        <Footer/>
    </React.Fragment>;
};

export default AddPatient;