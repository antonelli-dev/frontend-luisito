import React, { useRef, useState } from "react";
import FormContainer from "./FormContainer";
import "./EmpleadosForm.css";
import EmpleadosTable from "./EmpleadosTable";

interface EmpleadosFormData {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  genero: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  aerolinea_id: number;
  puesto_id: number;
  fecha_contratacion: string;
  salario: number;
}

interface EmpleadosFormProps {
  onSubmit: (formData: EmpleadosFormData) => void;
}

const EmpleadosForm: React.FC<EmpleadosFormProps> = ({ onSubmit }) => {
  const [showTable, setShowTable] = useState(false);
  const demoData = [
    {
      id: 1,
      nombres: "Juan",
      apellidos: "Pérez",
      fecha_nacimiento: "1990-05-15",
      genero: "Masculino",
      direccion: "Calle Principal 123",
      telefono: "123456789",
      correo_electronico: "juan@example.com",
      aerolinea_id: 1,
      puesto_id: 1,
      fecha_contratacion: "2022-01-01",
      salario: 2500
    },
    {
      id: 2,
      nombres: "María",
      apellidos: "Gómez",
      fecha_nacimiento: "1988-09-20",
      genero: "Femenino",
      direccion: "Avenida Secundaria 456",
      telefono: "987654321",
      correo_electronico: "maria@example.com",
      aerolinea_id: 2,
      puesto_id: 2,
      fecha_contratacion: "2021-12-15",
      salario: 2800
    }
  ];


  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  

  return (
    <div className="empleados-form-container">
      <FormContainer onSubmit={() => {}} title="Añadir Empleado">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="number" id="id" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="nombres">Nombres:</label>
          <input type="text" id="nombres" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fecha_nacimiento" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <input type="text" id="genero" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="correo_electronico">Correo Electrónico:</label>
          <input type="email" id="correo_electronico" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="aerolinea_id">ID de Aerolínea:</label>
          <input type="number" id="aerolinea_id" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="puesto_id">ID de Puesto:</label>
          <input type="number" id="puesto_id" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_contratacion">Fecha de Contratación:</label>
          <input type="date" id="fecha_contratacion" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="salario">Salario:</label>
          <input type="number" id="salario" step="0.01" disabled />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
        <EmpleadosTable data={demoData} />
      </FormContainer>

     
    </div>
  );
};

export default EmpleadosForm;
