import React from 'react';
import DownloadButton from '../../shared/img/Download.png'
import AppPhoto from '../../shared/img/APP.png'

const AboutApp = () => {
    return <div className="container-fluid mb-5" style={{backgroundColor: '#060852'}}>
        <div className="row">
            <div className="col-lg-6 mt-5">
                <div className="mt-5">
                    <p className="display-4 text-left font-weight-bold text-white mt-5 ml-5">Get All Our Services in Teresa App</p>
                </div>
                <p className="text-white ml-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem</p>
                <a href="/#" role="button" aria-pressed="true">
                    <img className="d-block mx-auto" src={DownloadButton} style={{width: '200px', height: '125px'}} alt=""/>
                </a>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
                    <img src={AppPhoto} alt="Phone" className="w-100" style={{height: '950px', backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}/>
            </div>
        </div>
    </div>;
}

export default AboutApp;