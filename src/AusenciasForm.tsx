import React, { useRef, useState } from "react";
import FormContainer from "./FormContainer";
import "./AusenciasForm.css";
import AusenciasTable from "./AusenciasTable";

interface AusenciasFormData {
  id_empleado: number;
  nombre: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface AusenciasFormProps {
  onSubmit: null;
}

const AusenciasForm: React.FC<AusenciasFormProps> = ({ onSubmit }) => {
  const idEmpleadoRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);
  const demoData = [ // Hardcoded demo data
    { id_empleado: 1, nombre: 'Empleado 1', tipo: 'Vacaciones', fecha_inicio: '2024-04-01', fecha_fin: '2024-04-05' },
    { id_empleado: 2, nombre: 'Empleado 2', tipo: 'Enfermedad', fecha_inicio: '2024-04-10', fecha_fin: '2024-04-12' },
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
    <FormContainer onSubmit={handleSubmit} title="Añadir Ausencia">
      <div className="form-group">
        <label htmlFor="idEmpleado">ID Empleado:</label>
        <input type="number" id="idEmpleado" ref={idEmpleadoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" ref={tipoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input type="date" id="fechaFin" ref={fechaFinRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
      <AusenciasTable data={demoData} />
    </FormContainer>
  );
};

export default AusenciasForm;
