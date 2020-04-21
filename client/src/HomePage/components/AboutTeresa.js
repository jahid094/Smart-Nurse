import React from 'react';
import './AboutTeresa.css'

const AboutTeresa = () => {
    return  <div className="container-fluid"  style={{paddingTop: '200px', backgroundColor: '#F1F5F8'}}>
        <div className="row w-100 about-teresa">
            <div className="col-md-5 card5">
                <div>
                    <p className="font-weight-bold text-center" style={{marginTop: '25px', paddingLeft: '25px', paddingRight: '25px', fontSize: '50px'}}>What is Teresa</p>
                </div>
                <hr style={{border: '1px solid red', marginLeft: '210px', marginRight: '230px'}}/>
                <div className="text-justify" style={{fontSize: '23px', marginLeft: '10px', marginRight: '10px', color: '#D8C8DA'}}>
                    Teresa is an online platform where you can
                    get all kind of medical services whenever
                    you need. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but   the leap into
                    electronic typesetting, remaining essentially
                    unchanged. 
                </div>
            </div>	
            <div className="col-md-7">	
            </div>
        </div>
    </div>;
}

export default AboutTeresa;