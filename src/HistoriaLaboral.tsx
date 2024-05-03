import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import "./HistoriaLaboral.css";
import FormContainer from "./FormContainer";
import HistorialLaboralTable from "./HistoriaLaboralTable";
import { toast } from "sonner";

const HistorialLaboralForm = () => {
  interface Empleado {
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

  interface Puesto {
    id: number;
    nombre: string;
    descripcion: string;
    salario: number;
  }

  interface HistorialLaboral {
    id_de_historial: number;
    fecha_inicio: string;
    id_empleado: number;
    id_de_puesto: number;
  }

  const [formData, setFormData] = useState({
    fecha_inicio: "",
    id_empleado: "",
    id_puesto: "",
  });
  const [didDelete, setDidDelete] = useState(false);
  const [historialLaboraltodos, setHistorialLaboraltodos] = useState<
    HistorialLaboral[]
  >([]);
  const [dataEmpleado, setDataEmpleado] = useState<Empleado[]>([]);
  const [empleadoSinHistorial, setEmpleadoSinHistorial] = useState<number[]>(
    []
  );
  const [dataPuesto, setDataPuesto] = useState<Puesto[]>([]);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const idEmpleadoRef = useRef<HTMLSelectElement>(null);
  const idPuestoRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetchData();
    fetchDataEmpleado();
    fetchDataPuesto();
    compareValuesOfArays();
  }, []);

  useEffect(() => {
    fetchDataEmpleado();
    compareValuesOfArays();
  }, []);

  useEffect(() => {
    compareValuesOfArays();
  }, [dataEmpleado, historialLaboraltodos, didDelete]);

  const compareValuesOfArays = () => {
    const arrayFinalEmpleado = dataEmpleado.map((data) => data.id);
    const arrayFinalEmpleadoConHistoria = historialLaboraltodos.map(
      (data) => data.id_empleado
    );
    const empleadoSinHistoria = arrayFinalEmpleado.filter(
      (valor) => !arrayFinalEmpleadoConHistoria.includes(valor)
    );
    setEmpleadoSinHistorial(empleadoSinHistoria);
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
        id_empleado: parseInt(idEmpleadoRef.current.value),
        id_de_puesto: parseInt(idPuestoRef.current.value),
      };
      fetchData();
      for (let i = 0; i < historialLaboraltodos.length; i++) {
        const historialaboral = historialLaboraltodos[i];
        if (
          historialaboral.id_de_puesto ===
            Number(newHistorialLaboral.id_de_puesto) &&
          historialaboral.id_empleado ===
            Number(newHistorialLaboral.id_empleado)
        ) {
          toast.error(
            "Ya existe una historia laboral de este usuario con este puesto"
          );
          break;
        } else {
          console.log("si paso");
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
      }
    }
  };

  const onDelete = (e: any) => {
    axios
      .delete(`http://localhost:4000/historialaboral/${e.data.id_de_historial}`)
      .then((x) =>
        toast.success("Se ha eliminado el historial laboral correctamente")
      );
    setDidDelete(!didDelete);
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
  const mapearEmpleados = empleadoSinHistorial.map((empleadoId) => {
    const empleadoFinal = dataEmpleado.find(
      (empleado) => empleado.id === empleadoId
    );
    console.log("Empleado final:", empleadoFinal);
    return empleadoFinal;
  });
  useLayoutEffect(() => {
    compareValuesOfArays();
  }, []);

  const fetchDataEmpleado = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/empleados",
    })
      .then(async (response) => {
        await setDataEmpleado(response.data);
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
        setHistorialLaboraltodos(response.data as HistorialLaboral[]);
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
          {dataEmpleado.map((data) => (
            <option value={data.id}>
              {" "}
              {data.nombres}
              {data.apellidos}
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
