import { Spinner } from 'react-bootstrap';

import React from 'react';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='primary'
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '10px',
        right: '20px',
      }}
    ></Spinner>
  );
};

export default Loader;
