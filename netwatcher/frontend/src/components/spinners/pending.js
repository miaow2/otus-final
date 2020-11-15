import React from 'react';

const PendingSpinner = () => {
  return (
    <>
      <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true"></span>
      <span className="badge badge-light" style={{ fontSize: '.7125rem' }}>Pending</span>
    </>
  );
};

export default PendingSpinner;