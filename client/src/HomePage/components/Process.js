import React from 'react';
import {Card}from 'react-bootstrap'
import './Process.css'

const Process = () => {
    return <div className="container-fluid process">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 ml-5">
                    <p className="h1 font-weight-normal ml-3" style={{color: '#010f54'}}>Process</p>
                    <p className="h1 ml-3 mb-3" style={{color: '#010f54'}}>How it work</p>
                    <div className="row">
                        <div className="col-xl-2 text-center justify-content-center mt-4">
                        <button className="btn btn-lg text-center rounded-circle" style={{backgroundColor: '#E58C8A'}}>01</button>
                        </div>
                        <div className="col-xl-10 mb-5 ml-n3">
                            <Card className="border-0" style={{backgroundColor: '#F4F8FB'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold">Download App or Visit Website</p>
                                    </Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-2 text-center justify-content-center mt-4">
                        <button className="btn btn-lg text-center rounded-circle" style={{backgroundColor: '#E58C8A'}}>02</button>
                        </div>
                        <div className="col-xl-10 mb-5 ml-n3">
                            <Card className="border-0" style={{backgroundColor: '#F4F8FB'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold">Login with valid ID</p>
                                    </Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-2 text-center justify-content-center mt-4">
                        <button className="btn btn-lg text-center rounded-circle" style={{backgroundColor: '#E58C8A'}}>03</button>
                        </div>
                        <div className="col-xl-10 mb-5 ml-n3">
                            <Card className="border-0" style={{backgroundColor: '#F4F8FB'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold">Create A Patient</p>
                                    </Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-2 text-center justify-content-center mt-4">
                        <button className="btn btn-lg text-center rounded-circle" style={{backgroundColor: '#E58C8A'}}>04</button>
                        </div>
                        <div className="col-xl-10 mb-5 ml-n3">
                            <Card className="border-0" style={{backgroundColor: '#F4F8FB'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <p className="h4 font-weight-bold">Let Us Take Care Of Your Illness</p>
                                    </Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Process;