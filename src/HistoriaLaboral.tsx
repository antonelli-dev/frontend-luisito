import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HistoriaLaboral.css";
import FormContainer from "./FormContainer";
import HistorialLaboralTable from "./HistoriaLaboralTable";

const HistorialLaboralForm = () => {
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    id_empleado: "",
    id_puesto: "",
  });

  const [historialLaboraltodos, setHistorialLaboraltodos] = useState<[]>([]);
  interface Empleado {
    id: number;
    nombres: string;
    apellidos: string;
  }
  const [dataEmpleado, setDataEmpleado] = useState<Empleado[]>([]);
  interface Puesto {
    id: number;
    nombre: string;
    descripcion: string;
    salario:number;
  }
  const [dataPuesto, setDataPuesto] = useState<Puesto[]>([]);


  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const idEmpleadoRef = useRef<HTMLSelectElement>(null);
  const idPuestoRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetchData();
    fetchDataEmpleado();
    fetchDataPuesto();
  }, []);

  const fetchDataPuesto = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/puestos"
    }).then(response =>{
      setDataPuesto(response.data);
    })
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      fechaInicioRef.current &&
      idEmpleadoRef.current &&
      idPuestoRef.current
    ) {
      const newHistorialLaboral = {
        fecha_inicio: fechaInicioRef.current.value,
        id_empleado: idEmpleadoRef.current.value,
        id_de_puesto: idPuestoRef.current.value,
      };
      console.log(newHistorialLaboral);
      axios
        .post("http://localhost:4000/historialaboral", newHistorialLaboral)
        .then((response) => {
          alert("Historial laboral creado correctamente");
        })
        .catch((error) => {
          console.error("Error al crear historial laboral:", error);
          alert("Ha ocurrido un error al crear el historial laboral.");
        });
    }
  };

  const onDelete = (e: any) => {
    axios
      .delete(`http://localhost:4000/historialaboral/${e.data.id_de_aerolinea}`)
      .then((x) => alert("Se ha eliminado el historial laboral correctamente"));
  };

  const onUpdate = (e: any) => {
    axios
      .put(
        `http://localhost:4000/historialaboral/${e.data.id_de_aerolinea}`,
        e.data
      )
      .then((x) => alert("Se ha guardado el historial laboral correctamente."));
  };

  const fetchDataEmpleado = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
    })
      .then((response) => {
        setDataEmpleado(response.data as Empleado[]);
      })
      .catch((error) => {
        console.error("Error fetching empleados data:", error);
        alert("Ha ocurrido un error al obtener los empleados.");
      });
  };

  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/historialaboral",
    })
      .then((response) => {
        setHistorialLaboraltodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching historial alboral data:", error);
        alert("Ha ocurrido un error al obtener los historiales laborales.");
      });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} required />
      </div>
    
      
      <div className="form-group">
        <label htmlFor="idEmpleado">ID de Empleado:</label>
        <select name="idEmpleado" id="idEmpleado" ref={idEmpleadoRef} required>
          {dataEmpleado.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombres} {empleado.apellidos}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="idPuesto">ID de Puesto:</label>
        <select name="idPuesto" id="idPuesto" ref={idPuestoRef} required>
          {dataPuesto.map((Puesto) => (
            <option key={Puesto.id} value={Puesto.id}>
              {Puesto.nombre} 
            </option>
          ))}
        </select>
      </div>

   
      <button type="submit" className="submit-button">Enviar</button>
      <HistorialLaboralTable
        data={historialLaboraltodos}
        onDelete={onDelete}
        onEdit={onUpdate}
      />
    </FormContainer>
  );
};

export default HistorialLaboralForm;
