import React from 'react';
import {Card}from 'react-bootstrap'
import LearnMore from '../../shared/img/Learn More.png'
import TopServiceIcon from '../../shared/img/icon.jpg'

const TopService = () => {
    return <div className="container-fluid py-5 my-5">
        <div className="container">
            <div className="row">
                <div className="col-md-5 bg-white" style={{paddingLeft: '70px', paddingTop: '100px'}}>
                    <p className="text-left font-weight-bold display-4">Top Services</p>
                    <p className="text-left font-weight-bold display-4 mt-n2">We Provide</p>
                    <p className="lead text-dark text-left">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                    </p>
                    <a href="/#" role="button" aria-pressed="true" >
                        <img className="d-block mx-auto mx-lg-0" src={LearnMore} alt="Learn More" style={{width: '225px', height: '150px'}}/></a>
                </div>
                <div className="col-md-7 bg-white my-2">
                    <div className="row">
                        <div className="col-md-2 text-center justify-content-center">
                            <img className="ml-n1" src={TopServiceIcon} alt="Top Service Icon" style={{width: '150px'}}/>
                        </div>
                        <div className="col-md-10 mt-1">
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <p className="font-weight-bold h1">Activity Management</p>
                                    </Card.Title>
                                    <Card.Text style={{fontSize:'15px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-2 text-center justify-content-center">
                            <img className="ml-n1" src={TopServiceIcon} alt="Top Service Icon" style={{width: '150px'}}/>
                        </div>
                        <div className="col-md-10 mt-1">
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <p className="font-weight-bold h1">Patient Routine</p>
                                    </Card.Title>
                                    <Card.Text style={{fontSize:'15px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-2 text-center justify-content-center">
                            <img className="ml-n1" src={TopServiceIcon} alt="Top Service Icon" style={{width: '150px'}}/>
                        </div>
                        <div className="col-md-10 mt-1">
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <p className="font-weight-bold h1">Patient Create</p>
                                    </Card.Title>
                                    <Card.Text style={{fontSize:'15px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-2 text-center justify-content-center">
                            <img className="ml-n1" src={TopServiceIcon} alt="Top Service Icon" style={{width: '150px'}}/>
                        </div>
                        <div className="col-md-10" style={{marginTop: '10px'}}>
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <p className="font-weight-bold h1">Medicine Shop</p>
                                    </Card.Title>
                                    <Card.Text style={{fontSize:'15px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-2 text-center justify-content-center">
                            <img className="ml-n1" src={TopServiceIcon} alt="Top Service Icon" style={{width: '150px'}}/>
                        </div>
                        <div className="col-md-10" style={{marginTop: '10px'}}>
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <p className="font-weight-bold h1">Real Time Notification</p>
                                    </Card.Title>
                                    <Card.Text style={{fontSize:'15px'}}>
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

export default TopService;