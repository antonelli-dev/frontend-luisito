import React, { useRef, useState } from "react";
import FormContainer from "../../FormContainer";
import "./AerolineasForm.css";
import axios from "axios";
import { CrearAerolineaDto } from "./dtos/crear-aerolinea-dto";
import AerolineasTable from "../../AerolineasTable";

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
  const [showDialog, setShowDialog] = useState(false);
  const demoData = [ // Hardcoded demo data
    { id: 1, nombre: 'Aerolínea 1', descripcion: 'Descripción de Aerolínea 1' },
    { id: 2, nombre: 'Aerolínea 2', descripcion: 'Descripción de Aerolínea 2' },
    // Add more demo data as needed
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nombreRef.current && descripcionRef.current) {
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
      }).then(response => {
        alert("Se ha creado la aerolínea correctamente.")
      })
      .catch(error => {
        alert("Ha ocurrido un error al crear la aerolínea.");
      });
    }
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
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
    
      <div style={{ marginTop: '20px' }}>
        <AerolineasTable data={demoData} />
      </div>
    </FormContainer>
  );
};

export default AerolineasForm;
