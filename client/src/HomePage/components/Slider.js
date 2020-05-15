import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../shared/img/front 1.jpg'
import Slider2 from '../../shared/img/front 2.jpg'
import Slider3 from '../../shared/img/front 3.jpg'
import './Slider.css'

const Slider = () => {
    return  <Carousel className="carousel slide">
        <Carousel.Item>
            <img
                className="d-block w-100 sliderimage"
                src={Slider1}
                alt="First slide"
            />
            <Carousel.Caption>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <p className="text-left font-weight-bold h1">Get all your medical solutions in all one place.</p>
                            <p className="animated slideInDown text-left lead">We provide all kind of medical services for your healthy life. We can feel your pain. </p>
                            <button className="btn btn-lg bg-white rounded-pill font-weight-bold" style={{color: '#080808'}}>Learn More</button>
                        </div>
                    </div>
                </div>	
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 sliderimage"
                src={Slider2}
                alt="Third slide"
            />
        
            <Carousel.Caption>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="text-left font-weight-bold h1">We Are Always Ready To Serve You</p>
                            <p className="animated slideInDown text-left lead">We provide all kind of medical services for your healthy life. We can feel your pain. </p>
                            <button className="btn btn-lg bg-white rounded-pill font-weight-bold" style={{color: '#080808'}}>Learn More</button>
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 sliderimage"
                src={Slider3}
                alt="Third slide"
            />
        
            <Carousel.Caption>
            <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="text-left font-weight-bold h1">We Are Always Ready To Serve You</p>
                            <p className="animated slideInDown text-left lead">We provide all kind of medical services for your healthy life. We can feel your pain. </p>
                            <button className="btn btn-lg bg-white rounded-pill font-weight-bold" style={{color: '#080808'}}>Learn More</button>
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>;
}

export default Slider;