import React, { useRef, useState } from "react";
import FormContainer from "../src/FormContainer";
import "./CapacitacionesForm.css";
import CapacitacionesTable from "./CapacitacionesTable";

interface CapacitacionesFormData {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_final: string;
}

interface CapacitacionesFormProps {
  onSubmit: null;
}

const CapacitacionesForm: React.FC<CapacitacionesFormProps> = ({ onSubmit }) => {
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinalRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);
  const demoData = [ // Hardcoded demo data
    { id: 1, nombre: 'Capacitación 1', descripcion: 'Descripción de Capacitación 1', fecha_inicio: '2024-04-01', fecha_final: '2024-04-05' },
    { id: 2, nombre: 'Capacitación 2', descripcion: 'Descripción de Capacitación 2', fecha_inicio: '2024-04-10', fecha_final: '2024-04-12' },
    // Add more demo data as needed
  ];

  const handleSubmit = () => {
    // Your form submission logic here
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Capacitación">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" ref={nombreRef} />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" id="descripcion" ref={descripcionRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFinal">Fecha de Finalización:</label>
        <input type="date" id="fechaFinal" ref={fechaFinalRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
    

     <CapacitacionesTable data={demoData} />
    </FormContainer>
  );
};

export default CapacitacionesForm;
