// PuestosForm.tsx
import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import "./PuestoForm.css";

interface PuestosFormData {
  id: number;
  nombre: string;
  descripcion: string;
  salario: number;
}

interface PuestosFormProps {
  onSubmit: (formData: PuestosFormData) => void;
}

const PuestosForm: React.FC<PuestosFormProps> = ({ onSubmit }) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const salarioRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (
      idRef.current &&
      nombreRef.current &&
      descripcionRef.current &&
      salarioRef.current
    ) {
      const formData: PuestosFormData = {
        id: parseInt(idRef.current.value),
        nombre: nombreRef.current.value,
        descripcion: descripcionRef.current.value,
        salario: parseFloat(salarioRef.current.value),
      };
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <FormContainer onSubmit={handleSubmit} title="Añadir Puesto">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="number" id="id" ref={idRef} />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" ref={nombreRef} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" ref={descripcionRef} />
        </div>
        <div className="form-group">
          <label htmlFor="salario">Salario:</label>
          <input type="number" id="salario" step="0.01" ref={salarioRef} />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </FormContainer>
      <div className="slider"></div> {/* Add slider here */}
    </div>
  );
};

export default PuestosForm;
