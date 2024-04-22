import React, { useRef } from "react";
import FormContainer from "../../FormContainer";
import "./AerolineasForm.css";
import axios, { AxiosResponse } from "axios";
import { CrearAerolineaDto } from "./dtos/crear-aerolinea-dto";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      nombreRef.current &&
      descripcionRef.current
    ) {
      // const aerolineas = aerolineasRef.current.value;
      const nombre = nombreRef.current.value;
      const descripcion = descripcionRef.current.value;

      axios({
        method: "post",
        url: "http://localhost:3000/aerolineas",
        data: {
          descripcion: nombre,
          nombre: descripcion
        } as CrearAerolineaDto,
        responseType: 'json'
    }).then(x => {
      alert("Se ha creado la arerolinea correctamente.")
    })
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
