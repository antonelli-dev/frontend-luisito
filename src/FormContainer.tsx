import React from 'react';
import './App.css';

const FormContainer = ({ children }:any) => {
  return (
    <div className="form-container">
      {children}
    </div>
  );
};

export default FormContainer;
