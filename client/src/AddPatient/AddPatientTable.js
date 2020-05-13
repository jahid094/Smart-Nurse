import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const AddPatientTable = props => {
    const columns = [
        {
            dataField: '_id',
            text: 'Routine Id',
            sort: true,
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        }, 
        {
            dataField: 'routineItem',
            text: 'Routine Item',
            sort: true,
            headerStyle: {
                width: '17%'
            }
        }, 
        {
            dataField: 'itemName',
            text: 'Name',
            sort: true,
            headerStyle: {
                width: '10%'
            }
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            sort: true,
            headerStyle: {
                width: '15%'
            }
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            sort: true,
            headerStyle: {
                width: '14%'
            }
        },
        {
            dataField: 'timesPerDay',
            text: 'Times Per Day',
            sort: true,
            headerStyle: {
                width: '19%'
            }
        },
        {
            dataField: 'beforeAfterMeal',
            text: 'Meal',
            sort: true,
            headerStyle: {
                width: '13%'
            }
        },
        {
            dataField: 'unit',
            text: 'Unit',
            sort: true,
            headerStyle: {
                width: '9%'
            }
        },
        {
            dataField: 'notification',
            text: 'Notification',
            sort: true,
            headerStyle: {
                width: '20%'
            }
        }
    ];
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100">
            <div className="container">
                <BootstrapTable
                    keyField='_id'
                    data={props.userRoutine}
                    columns={columns}
                    classes="table-responsive table-striped table-hover"
                    headerWrapperClasses="thead-dark"
                    pagination={paginationFactory()}
                />
            </div>
        </div>
        
    </React.Fragment>;
};

export default AddPatientTable;