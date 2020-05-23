import React from 'react';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from './BounceLoader'

const LoadingSpinner = () => {
  return <LoadingOverlay
    active
    spinner={<BounceLoader/>}/>;
};

export default LoadingSpinner;