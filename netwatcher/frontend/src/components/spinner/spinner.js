import React from 'react';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;