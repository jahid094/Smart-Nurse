import React from 'react';
import DownloadButton from '../../shared/img/Download.png'
import AppPhoto from '../../shared/img/APP.png'

const AboutApp = () => {
    return <div className="container-fluid" style={{backgroundColor: '#060852', marginBottom: '200px'}}>
        <div className="row">
            <div className="col-md-6">
                <div>
                    <p style={{fontSize: '50px', marginTop: '225px', marginLeft: '40px'}} className="font-weight-bold text-white">Get All Our Services in Teresa App</p>
                </div>
                <p className="text-white" style={{marginLeft: '40px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem</p>
                <a href="/#" role="button" aria-pressed="true">
                    <img src={DownloadButton} style={{width: '200px', height: '125px', marginLeft: '100px'}} alt=""/>
                </a>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <img src={AppPhoto} alt="Phone" className="w-100" style={{height: '950px', backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}/>
                </div>
            </div>
        </div>
    </div>;
}

export default AboutApp;