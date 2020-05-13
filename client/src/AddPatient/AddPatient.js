import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import AddPatientTable from './AddPatientTable'
import {AuthContext} from '../shared/context/auth-context'
import './AddPatient.css'

const AddPatient = () => {
    const auth = useContext(AuthContext)
    /* const patients = [
        {
            id: 10032,
            name: 'Mr. Abu Ubaida',
            age: 22,
            email: 'abu.ubaida@gmail.com'
        },
        {
            id: 10033,
            name: 'Samsul Islam',
            age: 20,
            email: 'samsulratul98@gmail.com'
        },
        {
            id: 10034,
            name: 'Ayon',
            age: 22,
            email: 'ayon522@gmail.com'
        },
        {
            id: 10035,
            name: 'Jahidul Islam',
            age: 22,
            email: 'jahid.aust39@gmail.com'
        }
    ] */
    const [search, setSearch] = useState("");
    const [userRoutine, setUserRoutine] = useState([])
    const [filteredUserRoutine, setFilteredUserRoutine] = useState([]);

    useEffect(() => {
        const getRoutine = async () => { 
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routines', {
                    id: auth.userId
                });
                setUserRoutine(response.data.routine)
            } catch (error) {
                console.log(error.response.data);
            }
          }
          getRoutine()
    }, [auth.userId])

    useEffect(() => {
        console.log(search)
        if(search){
            setFilteredUserRoutine(
                userRoutine.filter(routine =>
                   routine.itemName.toLowerCase().includes(search.toLowerCase()) || routine.beforeAfterMeal.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredUserRoutine([])
        }
    }, [search]);

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
                <div className="row">
                    <p className="h1 font-weight-normal">Search with the UserId and add your patient</p>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="input-group">
                            <input className="form-control py-2 rounded-pill mr-1 pr-5" type="search" placeholder="Patient ID" onChange={e => setSearch(e.target.value)}/>
                            <span className="input-group-append">
                                <button className="btn rounded-pill border-0 ml-n5" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddPatientTable userRoutine={filteredUserRoutine}/>
        <Footer/>
    </React.Fragment>;
};

export default AddPatient;