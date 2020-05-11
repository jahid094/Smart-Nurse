import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import AddPatientTable from './AddPatientTable'
import './AddPatient.css'

const AddPatient = () => {
    const patients = [
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
    ]
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
                    <div className="col-md-3">
                        <div className="input-group">
                            <input className="form-control py-2 rounded-pill mr-1 pr-5" type="search" placeholder="Patient ID"/>
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
        <AddPatientTable/>
        <Footer/>
    </React.Fragment>;
};

export default AddPatient;