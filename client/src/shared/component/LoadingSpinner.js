/* import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = () => {
  return <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>;
};

export default LoadingSpinner; */

import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
