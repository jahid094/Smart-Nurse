import React, {useContext} from 'react';
import {Card}from 'react-bootstrap'
import OnlineMedicineIcon from '../../shared/img/5.png'
import PatientRoutineIcon from '../../shared/img/4.png'
import ActivityManagemnetIcon from '../../shared/img/3.png'
import {AuthContext} from '../../shared/context/auth-context'
import './Service.css'

const Service = props => {
    const auth = useContext(AuthContext)
    return <div className="mt-2 pt-5" id={props.id}>
        <div className="container mb-5">
            <p className="h1 text-center font-weight-bold mb-5" style={{color: '#19184E'}}>Our Services</p>
            <div className="row">
                <div className="col-lg-4 d-flex align-items-stretch">
                    {
                        auth.isLoggedIn?
                        <a href="/addPatient" className="text-decoration-none">
                            <Card className="card1 service-background">
                                <Card.Img className="mx-auto" variant="top" src={OnlineMedicineIcon} alt="Online Medicine Icon"></Card.Img>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold text-dark">Add Patient</p>
                                    </Card.Title>
                                    <Card.Text className="text-dark">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </a>
                        : 
                        <Card className="card1">
                            <Card.Img className="mx-auto" variant="top" src={OnlineMedicineIcon} alt="Online Medicine Icon"></Card.Img>
                            <Card.Body>
                                <Card.Title>
                                    <p className="h4 font-weight-bold">Add Patient</p>
                                </Card.Title>
                                <Card.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                    {
                        auth.isLoggedIn?
                        <a href="/patientRoutine" className="text-decoration-none">
                            <Card className="card1 service-background">
                                <Card.Img className="mx-auto" variant="top" src={PatientRoutineIcon} alt="Patient Routine Icon"></Card.Img>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold text-dark">Patient Routine</p>
                                    </Card.Title>
                                    <Card.Text className="text-dark">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </a>
                        : <Card className="card1">
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
                    }
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                    {
                        auth.isLoggedIn?
                        <a href="/notification" className="text-decoration-none">
                            <Card className="card1 service-background">
                                <Card.Img className="mx-auto" variant="top" src={ActivityManagemnetIcon} alt="Activity Managemnet Icon"></Card.Img>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold text-dark">Real Time Notification</p>
                                    </Card.Title>
                                    <Card.Text className="text-dark">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </a>
                        : 
                        <Card className="card1">
                            <Card.Img className="mx-auto" variant="top" src={ActivityManagemnetIcon} alt="Activity Managemnet Icon"></Card.Img>
                            <Card.Body>
                                <Card.Title>
                                    <p className="h4 font-weight-bold">Real Time Notification</p>
                                </Card.Title>
                                <Card.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                </div>
            </div>
        </div>
    </div>;
}

export default Service;