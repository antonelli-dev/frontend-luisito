import React, { useRef, useState } from "react";
import FormContainer from "./FormContainer";
import "./PuestoForm.css";
import PuestosTable from "./PuestosTable";

interface PuestosFormData {
  nombre: string;
  descripcion: string;
  salario: number;
}

interface PuestosFormProps {
  onSubmit: (formData: PuestosFormData) => void;
}

const PuestosForm: React.FC<PuestosFormProps> = ({ onSubmit }) => {
  const [showTable, setShowTable] = useState(false);
  const demoData = [
    { nombre: 'Puesto 1', descripcion: 'Descripción 1', salario: 2500 },
    { nombre: 'Puesto 2', descripcion: 'Descripción 2', salario: 2800 }
    // Agregar más datos de ejemplo si es necesario
  ];

  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const salarioRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (
      nombreRef.current &&
      descripcionRef.current &&
      salarioRef.current
    ) {
      const formData: PuestosFormData = {
        nombre: nombreRef.current.value,
        descripcion: descripcionRef.current.value,
        salario: parseFloat(salarioRef.current.value),
      };
      onSubmit(formData);
    }
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  return (
      <FormContainer onSubmit={handleSubmit} title="Añadir Puesto">
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
        <PuestosTable data={demoData} />
      </FormContainer>
  );
};

export default PuestosForm;
