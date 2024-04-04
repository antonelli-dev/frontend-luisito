import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import "./AerolineasForm.css";

interface AerolineasFormData {
  aerolineas: string;
  nombre: string;
  descripcion: string;
}

interface AerolineasFormProps {
  onSubmit: null;
}

const AerolineasForm: React.FC<AerolineasFormProps> = ({ onSubmit }) => {
  const aerolineasRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (
      aerolineasRef.current &&
      nombreRef.current &&
      descripcionRef.current
    ) {
      const aerolineas = aerolineasRef.current.value;
      const nombre = nombreRef.current.value;
      const descripcion = descripcionRef.current.value;

    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Aerolínea">
      <div className="form-group">
        <label htmlFor="aerolineas">Aerolínea:</label>
        <input type="text" id="aerolineas" ref={aerolineasRef} />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" ref={nombreRef} />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" id="descripcion" ref={descripcionRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
    </FormContainer>
  );
};

export default AerolineasForm;
