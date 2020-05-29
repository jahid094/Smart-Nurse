import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const BounceLoader = () => {
    return <Spinner className="position-absolute d-flex justify-content-center align-items-center" animation="border" role="status" style={{width: '3rem', height: '3rem', color: '#020624', top: '50%', left: '50%'}}>
        <span className="sr-only">Loading...</span>
    </Spinner>;
};

export default BounceLoader;