import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Slider from '../HomePage/components/Slider'
import Service from '../HomePage/components/Service'
import AboutTeresa from '../HomePage/components/AboutTeresa'
import TopService from '../HomePage/components/TopService'
import AboutApp from '../HomePage/components/AboutApp'

const HomePage = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Smart Nurse</title>
        </Helmet>
        <Menu/>
        <Slider/>
        <Service/>
        <AboutTeresa/>
        <TopService/>
        <AboutApp/>
    </React.Fragment>;
}

export default HomePage;