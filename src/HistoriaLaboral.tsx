import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HistoriaLaboral.css";
import FormContainer from "./FormContainer";
import HistorialLaboralTable from "./HistoriaLaboralTable";
import { toast } from "sonner";

const HistorialLaboralForm = () => {
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    id_empleado: "",
    id_puesto: "",
  });

  const [historialLaboraltodos, setHistorialLaboraltodos] = useState<
    historialaboral[]
  >([]);
  interface Empleado {
    id: number;
    nombres: string;
    apellidos: string;
  }
  const [dataEmpleado, setDataEmpleado] = useState<Empleado[]>([]);
  const [empleadoSinHistorial, setEmpleadoSinHistorial] = useState<[]>([]);
  interface Puesto {
    id: number;
    nombre: string;
    descripcion: string;
    salario: number;
  }

  interface historialaboral {
    id_de_historial: number;
    fecha_inicio: string;
    id_empleado: number;
    id_de_puesto: number;
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

  const compareValuesOfArays = () => {
    console.log(dataEmpleado);
    const arrayFinalEmpleado = dataEmpleado.map((data) => data.id);
    const arrayFinalEmpleadoConHistoria = historialLaboraltodos.map(
      (data) => data.id_empleado
    );
    const empleadoSinHistoria = arrayFinalEmpleado.filter(
      (valor) => !arrayFinalEmpleadoConHistoria.includes(valor)
    );
    setEmpleadoSinHistorial(empleadoSinHistoria as []);
  };
  const fetchDataPuesto = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/puestos",
    }).then((response) => {
      setDataPuesto(response.data);
    });
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
      axios
        .post("http://localhost:4000/historialaboral", newHistorialLaboral)
        .then((response) => {
          toast.success("Historial laboral creado correctamente");
          fetchData();
        })
        .catch((error) => {
          toast.error("Error al crear historial laboral:");
        });
    }
  };

  const onDelete = (e: any) => {
    axios
      .delete(`http://localhost:4000/historialaboral/${e.data.id_de_historial}`)
      .then((x) =>
        toast.success("Se ha eliminado el historial laboral correctamente")
      );
  };

  const onUpdate = (e: any) => {
    axios
      .put(
        `http://localhost:4000/historialaboral/${e.data.id_de_historial}`,
        e.data
      )
      .then((x) =>
        toast.success("Se ha guardado el historial laboral correctamente.")
      );
  };

  const fetchDataEmpleado = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
    })
      .then((response) => {
        console.log(response.data);
        setDataEmpleado(response.data as Empleado[]);
        console.log("Test en el fetch", dataEmpleado);
      })
      .then(() => {
        compareValuesOfArays();
      })
      .catch((error) => {
        toast.error("Ha ocurrido un error al obtener los empleados.");
      });
  };

  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/historialaboral",
    })
      .then((response) => {
        setHistorialLaboraltodos(response.data as historialaboral[]);
      })
      .catch((error) => {
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
          {empleadoSinHistorial.map((empleadoId) => {
            const empleado = dataEmpleado.find(
              (empleado) => empleado.id === empleadoId
            );
            if (empleado) {
              return (
                <option key={empleado.id} value={empleado.id as number}>
                  {empleado.nombres} {empleado.apellidos}
                </option>
              );
            } else {
              return <option>No Hay Empleados sin Historial</option>;
            }
          })}
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

      <button type="submit" className="submit-button">
        Enviar
      </button>
      <HistorialLaboralTable
        data={historialLaboraltodos}
        onDelete={onDelete}
        onEdit={onUpdate}
      />
    </FormContainer>
  );
};

export default HistorialLaboralForm;
