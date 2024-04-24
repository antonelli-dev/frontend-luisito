import React, { useRef, useState } from "react";
import FormContainer from "./FormContainer";
import "./AusenciasForm.css";
import AusenciasTable from "./AusenciasTable";
import axios from "axios";
import { CrearAusenciaDTO } from "./views/aerolineas/dtos/crear-ausencia-dto";

interface AusenciasFormData {
  id_empleado: number;
  nombre: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface AusenciasFormProps {
  onSubmit: null;
}

const AusenciasForm: React.FC<AusenciasFormProps> = ({ onSubmit }) => {

  const [ausenciasList, setAusencias] = useState<[]>([]);
  const idEmpleadoRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaFinRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);

  const fetchData=()=>{
    axios({
      method: "get",
      url: "http://localhost:4000/ausencias"
    }).then((response) => {
      setAusencias(response.data);
    }).catch((error) => {
      console.error("Error fetching ausencias data:", error);
      alert("Ha ocurrido un error al obtener las ausencias.");
    });
  }

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:4000/ausencias",
      data: {
        id_empleado: Number(idEmpleadoRef.current?.value),
        tipo: tipoRef.current?.value,
        descripcion: descripcionRef.current?.value,
        fecha_inicio: new Date(fechaInicioRef.current?.value || new Date()),
        fecha_final: new Date(fechaFinRef.current?.value || new Date()),
      } as CrearAusenciaDTO,
      responseType: 'json'
    }).then(response => {
      fetchData();
      alert("Se ha creado la aerolínea correctamente.")
      
    })
    .catch(error => {
      alert("Ha ocurrido un error al crear la aerolínea.");
    });
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  

  const handleCloseTable = () => {
    setShowTable(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Ausencia">
      <div className="form-group">
        <label htmlFor="idEmpleado">ID Empleado:</label>
        <input type="number" id="idEmpleado" ref={idEmpleadoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" ref={tipoRef} />
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Descripcion:</label>
        <input type="text" id="tipo" ref={descripcionRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input type="date" id="fechaFin" ref={fechaFinRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
      <AusenciasTable data={ausenciasList} onDelete={()=>{}} onEdit={()=>{}} />
    </FormContainer>
  );
};

export default AusenciasForm;
