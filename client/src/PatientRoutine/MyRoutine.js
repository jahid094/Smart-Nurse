import React, {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import UpdateRoutineModal from './UpdateRoutineModal'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
// import Table from 'react-bootstrap/Table'

const MyRoutine = () => {
    const { SearchBar } = Search;
    const [rowInfo, setRowInfo] = useState({
        routineItem: null,
        name: null,
        startDate: null,
        endDate: null,
        continuity: null,
        mealState: null,
        time: null,
        unit: null,
        notificationState: null
    })
    const [rowSelect, setRowSelect] = useState(false)
    const routine = [
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '1',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '2',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '3',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '4',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '5',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '6',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '7',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '8',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '9',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '10',
            'notificationState': 'Before 15 Mins'
        },
        {
            'routineItem': 'Medicine',
            'name': 'Napa',
            'startDate': '01-01-2020',
            'endDate': '08-01-2020',
            'continuity': '7',
            'mealState': 'Before',
            'time': '9:00 AM',
            'unit': '11',
            'notificationState': 'Before 15 Mins'
        }
    ]

    const columns = [
        {
            dataField: 'routineItem',
            text: 'Routine Item',
            sort: true,
            headerStyle: {
                width: '16%'
            }
        }, 
        {
            dataField: 'name',
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
                width: '16%'
            }
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            sort: true,
            headerStyle: {
                width: '16%'
            }
        },
        {
            dataField: 'continuity',
            text: 'Continuity',
            sort: true,
            headerStyle: {
                width: '5%'
            }
        },
        {
            dataField: 'mealState',
            text: 'Meal',
            sort: true,
            headerStyle: {
                width: '5%'
            }
        },
        {
            dataField: 'time',
            text: 'Time',
            sort: true,
            headerStyle: {
                width: '10%'
            }
        },
        {
            dataField: 'unit',
            text: 'Unit',
            sort: true,
            headerStyle: {
                width: '5%'
            }
        },
        {
            dataField: 'notificationState',
            text: 'Notification',
            sort: true,
            headerStyle: {
                width: '16%'
            }
        },
    ];

    const errorHandler = () => {
        setRowSelect(false)
    }

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { 
            backgroundColor: 'rgba(5, 6, 70, 1)',
            color: 'white'
        },
        onSelect: (row, isSelect, rowIndex, e) => {
            /* console.log(row);
            console.log(isSelect);
            console.log(rowIndex); */
            setRowSelect(true)
            setRowInfo({
                routineItem: row.routineItem,
                name: row.name,
                startDate: row.startDate,
                endDate: row.endDate,
                continuity: row.continuity,
                mealState: row.mealState,
                time: row.time,
                unit: row.unit,
                notificationState: row.notificationState
            })
        }
    };


    /* const renderTableData = () => {
        return routine.map((routine, index) => {
           const {routineItem, name, startDate, endDate, continuity, mealState, time, unit, notificationState} = routine //destructuring
           return (
                <tr key={unit}>
                    <td>{routineItem}</td>
                    <td>{name}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{continuity}</td>
                    <td>{mealState}</td>
                    <td>{time}</td>
                    <td>{unit}</td>
                    <td>{notificationState}</td>
                </tr>
            )
        })
    } */ 

    return <div className="container-fluid" style={{backgroundColor: '#F5F5F5'}}>
        <div className="container">
            <p className="h2 text-center font-weight-bold mt-5">Your Routine</p>
            {rowInfo && rowSelect && <UpdateRoutineModal rowInfo={rowInfo} onClear={errorHandler.bind(this)}/>}
            {/* <div className="row mt-5 mb-5">
                <Table striped bordered hover>
                    <thead className="thead-dark"> 
                        <tr>
                            <th style={{width: '16%'}}>Routine Item</th>
                            <th style={{width: '10%'}}>Name</th>
                            <th style={{width: '16%'}}>Start Date</th>
                            <th style={{width: '16%'}}>End Date</th>
                            <th style={{width: '5%'}}>Continuity</th>
                            <th style={{width: '5%'}}>Meal</th>
                            <th style={{width: '10%'}}>Time</th>
                            <th style={{width: '5%'}}>Unit</th>
                            <th style={{width: '16%'}}>Notification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </Table>
            </div>*/}
            <ToolkitProvider
                striped  
                hover
                // responsive
                keyField='unit'
                data={routine}
                columns={columns} 
                search
            >
            {
                props => (
                <div>
                    <SearchBar { ...props.searchProps } />
                    <BootstrapTable
                    classes="table-responsive"
                    headerWrapperClasses="thead-dark"
                    { ...props.baseProps }
                    selectRow={ selectRow }
                    pagination={paginationFactory()}
                    />
                </div>
                )
            }
            </ToolkitProvider>
            {/* <BootstrapTable
                striped  
                hover
                keyField='name'
                data={routine}
                columns={columns} 
                pagination={paginationFactory()}
            /> */}
        </div>
    </div>;
};

export default MyRoutine;