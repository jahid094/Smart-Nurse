import React from 'react';
import './AboutTeresa.css'

const AboutTeresa = () => {
    return  <div className="container-fluid py-5 mb-5" style={{backgroundColor: '#F1F5F8'}}>
        <div className="container">
            <div className="row w-100 mt-5 mb-n5 about-teresa">
                <div className="col-lg-5 bg-white mt-n5 pb-5 ml-5 card5">
                    <div>
                        <p className="font-weight-bold text-center px-5 mt-5 h1">What is Teresa</p>
                    </div>
                    <hr className="mx-auto" style={{border: '1px solid red'}}/>
                    <div className="text-justify mx-2 h4 font-weight-normal" style={{color: '#D8C8DA'}}>
                        Teresa is an online platform where you can
                        get all kind of medical services whenever
                        you need. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but   the leap into
                        electronic typesetting, remaining essentially
                        unchanged. 
                    </div>
                </div>	
                <div className="col-lg-7 d-none d-lg-block">	
                </div>
            </div>
        </div>
    </div>;
}

export default AboutTeresa;