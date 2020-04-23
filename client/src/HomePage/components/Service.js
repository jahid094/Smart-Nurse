import React from 'react';
import {Card}from 'react-bootstrap'
import OnlineMedicineIcon from '../../shared/img/5.png'
import PatientRoutineIcon from '../../shared/img/4.png'
import ActivityManagemnetIcon from '../../shared/img/3.png'
import './Service.css'

const Service = () => {
    return <div className="mt-2 pt-5" style={{backgroundColor: '#f1f5f8'}}>
        <div className="container mb-5">
            <div className="row">
                <div className="col-lg-4 d-flex align-items-stretch">
                    <Card className="card1">
                        <Card.Img className="mx-auto" variant="top" src={OnlineMedicineIcon} alt="Online Medicine Icon"></Card.Img>
                        <Card.Body>
                            <Card.Title>
                                <p className="h4 font-weight-bold">Online Medicine</p>
                            </Card.Title>
                            <Card.Text>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                    <Card className="card1">
                        <Card.Img className="mx-auto" variant="top" src={PatientRoutineIcon} alt="Patient Routine Icon"></Card.Img>
                        <Card.Body>
                            <Card.Title>
                                <p className="h4 font-weight-bold">Patient Routine</p>
                            </Card.Title>
                            <Card.Text>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                    <Card className="card1">
                        <Card.Img className="mx-auto" variant="top" src={ActivityManagemnetIcon} alt="Activity Managemnet Icon"></Card.Img>
                    <Card.Body>
                        <Card.Title>
                            <p className="h4 font-weight-bold">Activity Management</p>
                        </Card.Title>
                        <Card.Text>
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