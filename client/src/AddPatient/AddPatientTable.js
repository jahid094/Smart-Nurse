import React, {useState, useContext} from 'react';
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {AuthContext} from '../shared/context/auth-context'

const AddPatientTable = props => {
    const auth = useContext(AuthContext)
    const [searchId, setSearchId] = useState("");
    const columns = [
        {
            dataField: '_id',
            text: 'User Id',
            sort: true,
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        }, 
        {
            dataField: 'firstname',
            text: 'First Name',
            sort: true,
            headerClasses: 'w-25'
        }, 
        {
            dataField: 'lastname',
            text: 'Last Name',
            sort: true,
            headerClasses: 'w-25'
        }, 
        {
            dataField: 'age',
            text: 'Age',
            sort: true,
            headerClasses: 'w-25'
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            headerClasses: 'w-25'
        }
    ];
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { 
            backgroundColor: 'rgba(5, 6, 70, 1)',
            color: 'white'
        },
        onSelect: (row, isSelect, rowIndex, e) => {
            setSearchId(row._id)
        }
    };
    const patientAdd = async () => {
        console.log(searchId)
        if(searchId){
            try {
                console.log(auth.userId)
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/sendRequest', {
                    recipients: [
                        {
                            id : searchId
                        }
                    ],
                    owner: auth.userId 
                });
                console.log(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
            setSearchId("")
        } else {
            console.log('You have to select a row')
        }
    }
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100">
            <div className="container">
                <BootstrapTable
                    keyField='_id'
                    data={props.userList}
                    columns={columns}
                    classes="table-striped table-hover"
                    headerWrapperClasses="thead-dark"
                    selectRow={ selectRow }
                    pagination={paginationFactory()}
                />
                {
                    props.userList.length!==0 ?
                    <div className="row">
                        <div className="col-4 offset-4">
                            <button  className="btn btn-lg btn-block text-white" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} onClick={function(){patientAdd()}}>Add</button>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-4 offset-4">
                            <a href="/createPatient" className="btn btn-lg btn-block text-white" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Add Patient Manually</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    </React.Fragment>;
};

export default AddPatientTable;