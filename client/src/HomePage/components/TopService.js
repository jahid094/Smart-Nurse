import React from 'react';
import LearnMore from '../../shared/img/Learn More.png'
import TopServiceIcon from '../../shared/img/icon.jpg'

const TopService = () => {
    return <div className="container-fluid " style={{paddingTop: '200px', paddingBottom: '200px'}}>
        <div className="row">
            <div className="col-md-5 bg-white" style={{paddingLeft: '70px', backgroundColor: 'white', paddingTop: '100px'}}>
                <div>
                    <p className="font-weight-bold" style={{fontSize: '50px'}}>Top Services</p>
                </div>
                <div>
                    <p className="font-weight-bold" style={{fontSize: '50px', marginTop: '-20px'}}>We Provide</p>
                </div>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                </p>
                <a href="/#" role="button" aria-pressed="true" >
                    <img src={LearnMore} alt="" style={{width: '225px', height: '150px'}}/></a>
            </div>
            <div className="col-md-7 bg-white" style={{marginTop: '20px', marginBottom: '20px'}}>
                <div className="row">
                    <div className="col-md-2 text-center justify-content-center">
                        <img src={TopServiceIcon} alt="" style={{width: '150px', marginLeft: '-10px'}}/>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <div className="card-title">
                            <p className="font-weight-bold h1">Activity Management</p>
                        </div>
                        <div style={{fontSize:'15px'}} className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </div>
                    </div>
                    <div className="col-md-2 text-center justify-content-center">
                        <img src={TopServiceIcon} alt="" style={{width: '150px', marginLeft: '-10px'}}/>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <div className="card-title">
                            <p className="font-weight-bold h1">Patient Routine</p>
                        </div>
                        <div style={{fontSize:'15px'}} className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </div>
                    </div>
                    <div className="col-md-2 text-center justify-content-center">
                        <img src={TopServiceIcon} alt="" style={{width: '150px', marginLeft: '-10px'}}/>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <div className="card-title">
                            <p className="font-weight-bold h1">Patient Create</p>
                        </div>
                        <div style={{fontSize:'15px'}} className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </div>
                    </div>
                    <div className="col-md-2 text-center justify-content-center">
                        <img src={TopServiceIcon} alt="" style={{width: '150px', marginLeft: '-10px'}}/>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <div className="card-title">
                            <p className="font-weight-bold h1">Medicine Shop</p>
                        </div>
                        <div style={{fontSize:'15px'}} className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </div>
                    </div>
                    <div className="col-md-2 text-center justify-content-center">
                    <img src={TopServiceIcon} alt="" style={{width: '150px', marginLeft: '-10px'}}/>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <div className="card-title">
                            <p className="font-weight-bold h1">Real Time Notification</p>
                        </div>
                        <div style={{fontSize:'15px'}} className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default TopService;