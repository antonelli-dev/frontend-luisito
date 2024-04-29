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
  const [dataEmpleado, setDataEmpleado] = useState<[]>([]);
  const nombresRef = useRef<HTMLInputElement>(null);
  const apellidosRef = useRef<HTMLInputElement>(null);
  const fechanacimientoRef = useRef<HTMLInputElement>(null);
  const generoRef = useRef<HTMLSelectElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const correoelectronicoRef = useRef<HTMLInputElement>(null);
  const idaerolineaRef = useRef<HTMLSelectElement>(null);
  const idpuestoRef = useRef<HTMLSelectElement>(null);
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
        alert("Se ha creado el empleado correctamente.");
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al crear el empleado.");
      });
  };

  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
    })
      .then((response) => {
        setDataEmpleado(response.data);
      })
      .catch((error) => {
        console.error("Error fetching empleados data:", error);
        alert("Ha ocurrido un error al obtener los empleados.");
      });
  };

  const [aerolineasData, setAerolineas] = useState<AerolineaDto[]>([]);
  const [puestoData, setPuesto] = useState<PuestosFormData[]>([]);

  const fetchDataAerolinea = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/aerolineas",
    })
      .then((response) => {
        setAerolineas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching aerolineas data:", error);
        alert("Ha ocurrido un error al obtener las aerolíneas.");
      });
  };

  const fetchDataPuestos = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/puestos"
    }).then(response =>{
      setPuesto(response.data);
    }).catch((error) => {
      alert("Ha ocurrido un error al obtener los puestos.");
    });
  };

  class AerolineaDto {
    id_de_aerolinea: number = 0;
    nombre: string = "";
    descripcion: string = "";
  }

  interface PuestosFormData {
    id: number;
    nombre: string;
    descripcion: string;
    salario: number;
  }

  useEffect(() => {
    fetchData();
    fetchDataAerolinea();
    fetchDataPuestos();
  }, []);

  const onDelete = (e: any) => {
    axios
      .delete(`http://localhost:4000/empleados/${e.data.id}`)
      .then((x) => alert("Se ha eliminado el empleado correctamente"));
  };

  const onEdit = (e: any) => {
    axios
      .put(`http://localhost:4000/empleados/${e.data.id}`, e.data)
      .then((x) => alert("Se ha guardado el empleado correctamente."));
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
        <select name="aerolinea_id" id="aerolinea_id" ref={idaerolineaRef}>
          {aerolineasData.map((aerolinea) => (
            <option value={aerolinea.id_de_aerolinea}>
              {aerolinea.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="puesto_id">ID de puesto:</label>
        <select name="puesto_id" id="puesto_id" ref={idpuestoRef}>
          {puestoData.map((puesto) => (
            <option value={puesto.id}>
              {puesto.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fecha_contratacion">Fecha de Contratación:</label>
        <input type="date" id="fecha_contratacion" ref={fechacontratacionRef} />
      </div>
      <div className="form-group">
        <label htmlFor="salario">Salario:</label>
        <input type="number" id="salario" ref={salarioRef} />
      </div>
      <button type="submit" className="submit-button">
        Enviar
      </button>
      <EmpleadosTable data={dataEmpleado} onEdit={onEdit} onDelete={onDelete} />
    </FormContainer>
  );
};

export default EmpleadosForm;
