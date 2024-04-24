import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HistoriaLaboral.css"
import FormContainer from "./FormContainer";
import HistorialLaboralTable from "./HistoriaLaboralTable";

const HistorialLaboralForm = () => {
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    id_empleado: "",
    id_puesto: "",
  });

  const [historialLaboraltodos, setHistorialLaboraltodos] = useState<[]>([]);

  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const idEmpleadoRef = useRef<HTMLInputElement>(null);
  const idPuestoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  },[])
  

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (fechaInicioRef.current && idEmpleadoRef.current && idPuestoRef.current) {
        const newHistorialLaboral = {
          fecha_inicio:  fechaInicioRef.current.value,
          id_empleado: idEmpleadoRef.current.value,
          id_de_puesto: idPuestoRef.current.value,
        };
        console.log(newHistorialLaboral)
    axios
      .post("http://localhost:4000/historialaboral", newHistorialLaboral)
      .then((response) => {
        alert("Historial laboral creado correctamente");
      })
      .catch((error) => {
        console.error("Error al crear historial laboral:", error);
        alert("Ha ocurrido un error al crear el historial laboral.");
      });
  };
}

const onDelete = (e: any) => {
    axios.delete(`http://localhost:4000/historialaboral/${e.data.id_de_aerolinea}`).then(x => alert("Se ha eliminado el historial laboral correctamente"));
  }

  const onUpdate = (e: any) => {
    axios.put(`http://localhost:4000/historialaboral/${e.data.id_de_aerolinea}`, e.data).then(x => alert("Se ha guardado el historial laboral correctamente."));
  };

const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/historialaboral"
    }).then((response) => {
      setHistorialLaboraltodos(response.data);
    }).catch((error) => {
      console.error("Error fetching historial alboral data:", error);
      alert("Ha ocurrido un error al obtener los historiales laborales.");
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          ref={fechaInicioRef}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="idEmpleado">ID de Empleado:</label>
        <input
          type="text"
          id="idEmpleado"
          ref={idEmpleadoRef}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="idPuesto">ID de Puesto:</label>
        <input
          type="text"
          id="idPuesto"
          ref={idPuestoRef}
          required
        />
      </div>
      <button type="submit">Enviar</button>
      <HistorialLaboralTable data={historialLaboraltodos} onDelete={onDelete} onEdit={onUpdate}/>
    </FormContainer>
  );
};

export default HistorialLaboralForm;
