import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import "./EmpleadosForm.css";

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
  const idRef = useRef<HTMLInputElement>(null);
  const nombresRef = useRef<HTMLInputElement>(null);
  const apellidosRef = useRef<HTMLInputElement>(null);
  const fechaNacimientoRef = useRef<HTMLInputElement>(null);
  const generoRef = useRef<HTMLInputElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const correoElectronicoRef = useRef<HTMLInputElement>(null);
  const aerolineaIdRef = useRef<HTMLInputElement>(null);
  const puestoIdRef = useRef<HTMLInputElement>(null);
  const fechaContratacionRef = useRef<HTMLInputElement>(null);
  const salarioRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (
      idRef.current &&
      nombresRef.current &&
      apellidosRef.current &&
      fechaNacimientoRef.current &&
      generoRef.current &&
      direccionRef.current &&
      telefonoRef.current &&
      correoElectronicoRef.current &&
      aerolineaIdRef.current &&
      puestoIdRef.current &&
      fechaContratacionRef.current &&
      salarioRef.current
    ) {
      const formData: EmpleadosFormData = {
        id: parseInt(idRef.current.value),
        nombres: nombresRef.current.value,
        apellidos: apellidosRef.current.value,
        fecha_nacimiento: fechaNacimientoRef.current.value,
        genero: generoRef.current.value,
        direccion: direccionRef.current.value,
        telefono: telefonoRef.current.value,
        correo_electronico: correoElectronicoRef.current.value,
        aerolinea_id: parseInt(aerolineaIdRef.current.value),
        puesto_id: parseInt(puestoIdRef.current.value),
        fecha_contratacion: fechaContratacionRef.current.value,
        salario: parseFloat(salarioRef.current.value),
      };
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <FormContainer onSubmit={handleSubmit} title="Añadir Empleado">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="number" id="id" ref={idRef} />
        </div>
        <div className="form-group">
          <label htmlFor="nombres">Nombres:</label>
          <input type="text" id="nombres" ref={nombresRef} />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" ref={apellidosRef} />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fechaNacimiento" ref={fechaNacimientoRef} />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <input type="text" id="genero" ref={generoRef} />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" ref={direccionRef} />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" ref={telefonoRef} />
        </div>
        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input type="email" id="correoElectronico" ref={correoElectronicoRef} />
        </div>
        <div className="form-group">
          <label htmlFor="aerolineaId">ID de Aerolínea:</label>
          <input type="number" id="aerolineaId" ref={aerolineaIdRef} />
        </div>
        <div className="form-group">
          <label htmlFor="puestoId">ID de Puesto:</label>
          <input type="number" id="puestoId" ref={puestoIdRef} />
        </div>
        <div className="form-group">
          <label htmlFor="fechaContratacion">Fecha de Contratación:</label>
          <input type="date" id="fechaContratacion" ref={fechaContratacionRef} />
        </div>
        <div className="form-group">
          <label htmlFor="salario">Salario:</label>
          <input type="number" id="salario" step="0.01" ref={salarioRef} />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </FormContainer>
    </div>
  );
};

export default EmpleadosForm;
