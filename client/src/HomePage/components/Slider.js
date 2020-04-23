import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../shared/img/Slide.jpg'
import Slider2 from '../../shared/img/5.jpg'
import Slider3 from '../../shared/img/6.jpg'
import LearnMore from '../../shared/img/Learn More.png'
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
                            <p className="text-left font-weight-bold" style={{fontSize: '40px'}}>Get all your medical solutions in all one place.</p>
                            <p className="animated slideInDown text-left" style={{fontSize: '15px'}}>We provide all kind of medical services
    for your healthy life. We can feel your pain. </p>
                            <a className="animated fadeInLeft" href="# " role="button" aria-pressed="true" >
                                <img src={LearnMore} alt="" style={{width: '225px', height: '150px'}}/>
                            </a>
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
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 sliderimage"
                src={Slider3}
                alt="Third slide"
            />
        
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>;
}

export default Slider;