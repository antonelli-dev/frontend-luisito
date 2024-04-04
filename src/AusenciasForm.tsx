import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import "./AusenciasForm.css";

interface AusenciasFormData {
  id_empleado: number;
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

  const handleSubmit = () => {
    if (
      idEmpleadoRef.current &&
      tipoRef.current &&
      fechaInicioRef.current &&
      fechaFinRef.current
    ) {
      const id_empleado = parseInt(idEmpleadoRef.current.value);
      const tipo = tipoRef.current.value;
      const fecha_inicio = fechaInicioRef.current.value;
      const fecha_fin = fechaFinRef.current.value;
    }
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
    </FormContainer>
  );
};

export default AusenciasForm;
