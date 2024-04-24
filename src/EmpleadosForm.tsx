import React, { useRef, useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import "./EmpleadosForm.css";
import EmpleadosTable from "./EmpleadosTable";
import axios from "axios";
import { CrearAerolineaDto } from "./views/aerolineas/dtos/crear-aerolinea-dto";
import { CrearEmpleadoDto } from "./views/aerolineas/dtos/crear-empleado-dto";

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

interface EmpleadosFormProps {}

const EmpleadosForm: React.FC<EmpleadosFormProps> = ({}) => {
  const [showTable, setShowTable] = useState(false);
  const [dataEmpleado, setDataEmpleado] = useState([]);
  const nombresRef = useRef<HTMLInputElement>(null);
  const apellidosRef = useRef<HTMLInputElement>(null);
  const fechanacimientoRef = useRef<HTMLInputElement>(null);
  const generoRef = useRef<HTMLSelectElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const correoelectronicoRef = useRef<HTMLInputElement>(null);
  const idaerolineaRef = useRef<HTMLInputElement>(null);
  const idpuestoRef = useRef<HTMLInputElement>(null);
  const fechacontratacionRef = useRef<HTMLInputElement>(null);
  const salarioRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:4000/empleados",
      data: {
        nombres: nombresRef.current?.value || "",
        apellidos: apellidosRef.current?.value || "",
        fecha_nacimiento: new Date(
          fechanacimientoRef.current?.value || new Date().getTime()
        ),
        genero: generoRef.current?.value || "",
        direccion: direccionRef.current?.value || "",
        telefono: telefonoRef.current?.value || "",
        correo_electronico: correoelectronicoRef.current?.value || "",
        aerolinea_id: Number(idaerolineaRef.current?.value) || 0,
        puesto_id: Number(idpuestoRef.current?.value) || 0,
        fecha_contratacion: new Date(
          fechacontratacionRef.current?.value || new Date()
        ),
        salario: Number(salarioRef.current?.value) || 0,
      } as CrearEmpleadoDto,
      responseType: "json",
    })
      .then((response) => {
        alert("Se ha creado la aerolínea correctamente.");
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al crear la aerolínea.");
      });
  };

  const actualizarEmpleados = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
      responseType: "json",
    })
      .then((response) => {
        setDataEmpleado(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al obtener los empleados.");
      });
  };

  const eliminarEmpleado = (id: any) => {
    axios.delete(`http://localhost:4000/empleados/${id}`)
      .then((response) => {
        setDataEmpleado(dataEmpleado.filter((empleado: any) => empleado.id !== id));
        console.log("Empleado eliminado:", id);
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al eliminar el empleado.");
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
      responseType: "json",
    })
      .then((response) => {
        setDataEmpleado(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al obtener los empleados.");
      });
  }, []);

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  const handleEdit = (row: any) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (id: any) => {
    console.log(`entrando ${id}`);
    eliminarEmpleado(id);
  };

  return (
    <FormContainer title="Añadir Empleado" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombres">Nombres:</label>
        <input type="text" id="nombres" ref={nombresRef} />
      </div>
      <div className="form-group">
        <label htmlFor="apellidos">Apellidos:</label>
        <input type="text" id="apellidos" ref={apellidosRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" ref={fechanacimientoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="genero">Género:</label>
        <select name="genero" id="genero" ref={generoRef}>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
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
        <label htmlFor="correo_electronico">Correo Electrónico:</label>
        <input
          type="email"
          id="correo_electronico"
          ref={correoelectronicoRef}
        />
      </div>
      <div className="form-group">
        <label htmlFor="aerolinea_id">ID de Aerolínea:</label>
        <input type="number" id="aerolinea_id" ref={idaerolineaRef} />
      </div>
      <div className="form-group">
        <label htmlFor="puesto_id">ID de Puesto:</label>
        <input type="number" id="puesto_id" ref={idpuestoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fecha_contratacion">Fecha de Contratación:</label>
        <input type="date" id="fecha_contratacion" ref={fechacontratacionRef} />
      </div>
      <div className="form-group">
        <label htmlFor="salario">Salario:</label>
        <input type="number" id="salario" step="0.01" ref={salarioRef} />
      </div>
      <button type="submit" className="submit-button">
        Enviar
      </button>
      <EmpleadosTable
        data={dataEmpleado}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </FormContainer>
  );
};

export default EmpleadosForm;
