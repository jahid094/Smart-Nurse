import React from 'react';
import {Card}from 'react-bootstrap'
import OnlineMedicineIcon from '../../shared/img/5.png'
import PatientRoutineIcon from '../../shared/img/4.png'
import ActivityManagemnetIcon from '../../shared/img/3.png'
import './Service.css'

const Service = () => {
    return <div style={{backgroundColor: '#f1f5f8', paddingTop: '200px'}}>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <Card className="card1">
                    <img className="center" src={OnlineMedicineIcon} alt="Online Medicine Icon"/>
                    <Card.Body>
                        <Card.Title style={{fontSize: '25px'}}>
                            <p className="font-weight-bold">Online Medicine</p>
                        </Card.Title>
                        <Card.Text style={{fontSize: '15px'}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="card1">
                    <img className="center" src={PatientRoutineIcon} alt="Patient Routine Icon"/>
                    <Card.Body>
                    <Card.Title style={{fontSize: '25px'}}>
                            <p className="font-weight-bold">Patient Routine</p>
                        </Card.Title>
                        <Card.Text style={{fontSize: '15px'}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="card1">
                        <img className="center" src={ActivityManagemnetIcon} alt="Activity Managemnet Icon"/>
                    <Card.Body>
                    <Card.Title style={{fontSize: '25px'}}>
                            <p className="font-weight-bold">Activity Management</p>
                        </Card.Title>
                        <Card.Text style={{fontSize: '15px'}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    </div>;
}

export default Service;