import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import "./CapacitacionesForm.css";

interface CapacitacionesFormData {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_final: string;
}

interface CapacitacionesFormProps {
  onSubmit: (formData: CapacitacionesFormData) => void;
}

const CapacitacionesForm: React.FC<CapacitacionesFormProps> = ({ onSubmit }) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinalRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (
      idRef.current &&
      nombreRef.current &&
      descripcionRef.current &&
      fechaInicioRef.current &&
      fechaFinalRef.current
    ) {
      const formData: CapacitacionesFormData = {
        id: parseInt(idRef.current.value),
        nombre: nombreRef.current.value,
        descripcion: descripcionRef.current.value,
        fecha_inicio: fechaInicioRef.current.value,
        fecha_final: fechaFinalRef.current.value,
      };
      onSubmit(formData);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Capacitación">
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
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFinal">Fecha de Finalización:</label>
        <input type="date" id="fechaFinal" ref={fechaFinalRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
    </FormContainer>
  );
};

export default CapacitacionesForm;
