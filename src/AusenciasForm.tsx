import React, { useRef, useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import "./AusenciasForm.css";
import AusenciasTable from "./AusenciasTable";
import axios from "axios";
import { CrearAusenciaDTO } from "./views/aerolineas/dtos/crear-ausencia-dto";
import { toast, Toaster } from "sonner";

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
interface Empleado {
  id: number;
  nombres: string;
  apellidos: string;
}


const AusenciasForm: React.FC<AusenciasFormProps> = ({ onSubmit }) => {
  const [ausenciasList, setAusencias] = useState<[]>([]);
  const idEmpleadoRef = useRef<HTMLSelectElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaFinRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);
  const [dataEmpleado, setDataEmpleado] = useState<Empleado[]>([]);
  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/ausencias",
    })
      .then((response) => {
        setAusencias(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ausencias data:", error);
      });
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

  useEffect(() => {
    fetchData();
    fetchDataEmpleado();
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
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
      responseType: "json",
    })
      .then((response) => {
        fetchData();
        toast.success("Exito en la operacion");
      })
      .catch((error) => {
        toast.error("Error al crear al ausencia")
      });
  };

  const onDelete = (e: any) => {
    axios
      .delete(`http://localhost:4000/ausencias/${e.data.id}`)
      .then((x) => toast.success("Exito en la operacion"));
  };

  const onUpdate = (e: any) => {
    axios
      .put(`http://localhost:4000/ausencias/${e.data.id}`, e.data)
      .then((x) =>  toast.success("Exito en la operacion"));
  };
  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Ausencia">
      <div className="form-group">
        <label htmlFor="idEmpleado">ID Empleado:</label>
        <select id="idEmpleado" ref={idEmpleadoRef} >
            {dataEmpleado.map((empleado) =>{
             return <option value={empleado.id}>{empleado.nombres}</option>
            })}
        </select>
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
      <button type="submit" className="submit-button">
        Enviar
      </button>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <AusenciasTable
          data={ausenciasList}
          onDelete={onDelete}
          onEdit={onUpdate}
        />
      </div>
    </FormContainer>
  );
};

export default AusenciasForm;
