import React, { ReactNode } from 'react';
import './App.css';

interface IFormContainerProps {
  children: ReactNode,
  title?: string;
  onSubmit?: (e: any) => void;
};

const FormContainer = ({ children, onSubmit  }: IFormContainerProps) => {
  return (
    <form className="form-container" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormContainer;
