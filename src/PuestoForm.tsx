import React, { useEffect, useRef, useState } from "react";
import FormContainer from "./FormContainer";
import "./PuestoForm.css";
import PuestosTable from "./PuestosTable";
import { CrearPuestoDTO } from "./views/aerolineas/dtos/crear-puesto-dto";
import axios from "axios";

interface PuestosFormData {
  nombre: string;
  descripcion: string;
  salario: number;
}

interface PuestosFormProps {
  onSubmit: (formData: PuestosFormData) => void;
}

const PuestosForm: React.FC<PuestosFormProps> = ({ onSubmit }) => {
  const [showTable, setShowTable] = useState(false);
  const [puestoData, setPuesto] = useState<[]>([]);

  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const salarioRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    fetchData(); 
  },[]);

  const fetchData = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/puestos"
    }).then(response =>{
      setPuesto(response.data);
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:4000/puestos",
      data: {
        nombre: nombreRef.current?.value,
        descripcion: descripcionRef.current?.value,
        salario:Number(salarioRef.current?.value),
      } as CrearPuestoDTO,
      responseType: "json",
    })
      .then((response) => {
        fetchData();
        alert("Se ha creado el puesto correctamente.");
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al crear el puesto.");
      });
  };
  



  return (
      <FormContainer onSubmit={handleSubmit} title="Añadir Puesto">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" ref={nombreRef} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" ref={descripcionRef} />
        </div>
        <div className="form-group">
          <label htmlFor="salario">Salario:</label>
          <input type="number" id="salario" ref={salarioRef} />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
        <PuestosTable data={puestoData} onDelete={()=>{}} onEdit={()=>{}}/>
      </FormContainer>
  );
};

export default PuestosForm;
