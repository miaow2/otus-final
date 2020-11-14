import React from 'react';

const PendingSpinner = () => {
  return (
    // <div className="spinner-grow-sm text-success" role="status">
    //   <span className="sr-only">Pending...</span>
    //   Pending...
    // </div>
    <>
      <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true"></span>
      Pending
    </>
  );
};

export default PendingSpinner;