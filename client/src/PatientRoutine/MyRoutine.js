import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import UpdateRoutineModal from './UpdateRoutineModal'
import ViewRoutineModal from './ViewRoutineModal'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import ErrorModal from '../shared/component/ErrorModal'
import {AuthContext} from '../shared/context/auth-context'
import ApiCalendar from './ApiCalendar'

/* eslint no-eval: 0 */

const MyRoutine = props => {
    const auth = useContext(AuthContext)
    const [userRoutine, setUserRoutine] = useState([])
    const [rowInfo, setRowInfo] = useState([])
    const [time1, setTime1] = useState('')
    const [time2, setTime2] = useState('')
    const [time3, setTime3] = useState('')
    const [time4, setTime4] = useState('')
    const [time5, setTime5] = useState('')
    const [rowSelect, setRowSelect] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    // const [pageLoading, setPageLoading] = useState(true)
    const [testBool, setTestBool] = useState(false)
    const [signBool, setSignBool] = useState(ApiCalendar.sign)

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
          console.log('Normal Effect')
    }, [auth.userId])

    useEffect(() => {
        const getRoutine = async () => { 
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'routines', {
                    id: auth.userId
                });
                console.log('In getroutine')
                if(response.data.routine){
                    setUserRoutine(response.data.routine)
                } else {
                    setUserRoutine([])
                }
            } catch (error) {
                console.log(error.response.data);
                setUserRoutine([])
            }
          }
          const mustExecuted = async () => {
              await getRoutine()
              console.log('Delete Effect')
              console.log(userRoutine)
              setTestBool(false)
          }
          mustExecuted()
          
    }, [testBool])

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
          props.pageNotRender()
          console.log('Add Effect')
    }, [props.renderPage])

    useEffect(()=> {
        console.log('Effect in sign')
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(signUpdate());
        });
        setSign(ApiCalendar.sign)
        setSignBool(ApiCalendar.sign)
        console.log(sign)
    }, [signBool])

    const { SearchBar } = Search;

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn-success" onClick={() => 
                    viewRow()
                }><i className="fas fa-eye"></i>
                </button>
                <button type="button" className="btn-primary" onClick={() => 
                    updateRow()
                }><i className="fas fa-edit"></i>
                </button>
                <button type="button" className="btn-danger" onClick={() => 
                    deleteRow(row)
                }><i className="fas fa-times-circle"></i>
                </button>
            </div>
        </React.Fragment>;
    } 

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
        },
        { 
            dataField: "edit", 
            text: "Actions",
            sort: false,
            formatter: rankFormatter,
            headerStyle: {
                width: '1%'
            }
        }
    ];

    const [sign, setSign] = useState(ApiCalendar.sign)

    const signUpdate = () => {
        setSign(ApiCalendar.sign)
    }

    const handleItemClick = async (event, name) => {
        if (name === 'sign-in') {
            await ApiCalendar.handleAuthClick();
            console.log(sign)
            setSign(ApiCalendar.sign)
            setSignBool(ApiCalendar.sign)
            console.log(sign)
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
            console.log(sign)
            setSign(ApiCalendar.sign)
            setSignBool(ApiCalendar.sign)
            console.log(sign)
        }
    }

    const getEvent = () => {
        if (ApiCalendar.sign) {
                console.log(ApiCalendar.sign)
                ApiCalendar.listUpcomingEvents(10).then(({result}) => {
                console.log('Event List:');
                console.log(result.items);
                setMessage('Please check your console to view your event list.')
            });
        } else{
            console.log('Not Signed In');
            setMessage('You are not signed in.')
        }
    }

    const errorHandler = () => {
        setRowSelect(false)
        setViewDetails(false)
        props.pageRender()
    }

    const viewRow = () => {
        if(rowInfo){
            setViewDetails(true)
        }
    }

    const updateRow = () => {
        if(rowInfo){
            setRowSelect(true)
        }
    }

    const deleteRow = async (row) => {
        selectRow.clickToSelect = false
        setIsLoading(true)
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'routine/'+row._id);
            console.log(response.data.startDate)
            console.log(response.data.endDate)
            let i
            let eventMinTime = []
            let eventMaxTime = []
            let eventMinTimeUTC = []
            let eventMaxTimeUTC = []
            let events = []
            for (i = 0; i < response.data.timesPerDay; i++) {
                eventMinTime[i] = new Date(response.data.startDate)
                let input = response.data.times[i].time
                var fields = input.split(':');
                var hour = fields[0];
                var minute = fields[1];
                eventMinTime[i].setHours(hour)
                eventMinTime[i].setMinutes(minute)
                eventMinTimeUTC[i] = moment(eventMinTime[i]).format();                
                eventMaxTime[i] = new Date(response.data.endDate)
                eventMaxTime[i].setHours(hour)
                eventMaxTime[i].setMinutes(minute)
                eventMaxTimeUTC[i] = moment(eventMaxTime[i]).format();                
            }
            if(response.data.timesPerDay > 1){
                console.log('If')
                console.log(eventMinTimeUTC[0])
                console.log(eventMaxTimeUTC[response.data.timesPerDay - 1])
                console.log(moment(response.data.startDate).isSame(response.data.endDate))
                if(!moment(response.data.startDate).isSame(response.data.endDate)){
                    await ApiCalendar.listUpcomingEvents(10, eventMinTimeUTC[0], eventMaxTimeUTC[response.data.timesPerDay - 1]).then(({result}) => {
                        events = result.items
                    });
                } else {
                    await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                        events = result.items
                    });
                }
            } else {
                console.log('Else')
                await ApiCalendar.listTodayEvents(10, eventMinTimeUTC[0]).then(({result}) => {
                    events = result.items
                });
            }
            
            console.log('Event List Loop Finish');
            console.log('Event List:');
            console.log(events);
            let deleteId = []
            for (i = 0; i < events.length; i++) {
                if(eventMinTimeUTC.indexOf(events[i].start.dateTime) > -1 && eventMaxTimeUTC.indexOf(events[i].end.dateTime) > -1){
                    deleteId.push(events[i].id)
                }
            }
            const deleteResponse = await axios.delete(process.env.REACT_APP_BACKEND_URL+'routine/'+row._id);
            setMessage(deleteResponse.data.message)
            for (i = 0; i < deleteId.length; i++) {
                console.log(deleteId[i])
                if (ApiCalendar.sign) {
                    ApiCalendar.deleteEvent(deleteId[i]).then(({result}) => {
                        setMessage('Your event is deleted.')
                    });
                } else{
                    setMessage('Your event is not deleted because you are not signed in.')
                }
            }
            setRowSelect(false)
            selectRow.clickToSelect = false
            setMessage(response.data.message)
            setIsLoading(false)
            setTestBool(true)
        } catch (error) {
            console.log(error);
            selectRow.clickToSelect = false
            setMessage(error.response.data.message)
            setIsLoading(false)
            setTestBool(true)
        }
    }

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { 
            backgroundColor: 'rgba(5, 6, 70, 1)',
            color: 'white'
        },
        onSelect: (row, isSelect, rowIndex, e) => {
            let routineItem = row.routineItem
            let itemName = row.itemName
            let startDate = row.startDate
            let endDate =  row.endDate
            let timesPerDay = row.timesPerDay
            let beforeAfterMeal = row.beforeAfterMeal
            // console.log(row.times.length)
            let length = row.times.length
            let i = 0
            for(i = 0; i < length; i++){
                eval('setTime'+(i+1))(row.times[i].time)
            }
            let unit = row.unit
            let notificationState = row.notification
            let userType = row.notificationFor
            // console.log(row)
            /* console.log(routineItem);
            console.log(itemName);
            console.log(startDate);
            console.log(endDate);
            console.log(timesPerDay);
            console.log(beforeAfterMeal);
            console.log(time1);
            console.log(time2);
            console.log(time3);
            console.log(time4);
            console.log(time5);
            console.log(unit);
            console.log(notificationState) */
            if(eval('time'+(timesPerDay))){
                console.log("if")
                setRowInfo({
                    id: row._id,
                    routineItem,
                    itemName,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    timesPerDay,
                    beforeAfterMeal,
                    time1,
                    time2,
                    time3,
                    time4,
                    time5,
                    unit,
                    notificationState,
                    userType
                })
                console.log(rowInfo)
                // setRowSelect(true)
            }
        }
    };

    const messageHandler = () => {
        setMessage(null)
    }

    return <div className="container-fluid" style={{backgroundColor: '#F5F5F5'}}>
        <div className="container">
            {message && <ErrorModal message={message} onClear={messageHandler.bind(this)}/>}
            <p className="h2 text-center font-weight-bold mt-5">Your Routine</p>
            {rowInfo && rowSelect && <UpdateRoutineModal rowInfo={rowInfo} onClear={errorHandler.bind(this)}/>}
            {rowInfo && viewDetails && <ViewRoutineModal rowInfo={rowInfo} onClear={errorHandler.bind(this)}/>}
            {isLoading && <LoadingSpinner asOverlay/>}
            <ToolkitProvider
                keyField='_id'
                data={userRoutine}
                columns={columns} 
                search
            >
            {
                props => (
                <div>
                    <SearchBar { ...props.searchProps } />
                    <BootstrapTable
                    classes="table-responsive table-striped table-hover"
                    headerWrapperClasses="thead-dark"
                    { ...props.baseProps }
                    selectRow={ selectRow }
                    pagination={paginationFactory()}
                    />
                </div>
                )
            }
            </ToolkitProvider>
            {
                ApiCalendar.sign ? 
                <div className="col-6 offset-3 col-md-4 offset-md-4 mt-2">
                    <Button className="mx-auto btn-block" onClick={(e) => handleItemClick(e, 'sign-out')} variant="danger">Sign Out</Button>
                </div>
                :
                <div className="col-6 offset-3 col-md-4 offset-md-4 mt-2">
                    <Button className="mx-auto btn-block" onClick={(e) => handleItemClick(e, 'sign-in')} variant="success">Sign In</Button>
                </div>
            }
        </div>
    </div>;
};

export default MyRoutine;