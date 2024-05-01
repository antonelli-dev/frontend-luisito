import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../../FormContainer";
import "./AerolineasForm.css";
import axios from "axios";
import { CrearAerolineaDto } from "./dtos/crear-aerolinea-dto";
import AerolineasTable from "../../AerolineasTable";
import { AerolineaDto } from "./dtos/aerolinea.dto";
import { toast } from "sonner";

interface AerolineasFormData {
  aerolineas: string;
  nombre: string;
  descripcion: string;
}

interface AerolineasFormProps {
  onSubmit: null;
}

const AerolineasForm: React.FC<AerolineasFormProps> = ({ onSubmit }) => {
  const [aerolineasData, setAerolineas] = useState<AerolineaDto[]>([]);
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const [showDialog, setShowDialog] = useState(false);
 

    
  const onDelete = (e: any) => {
    axios.delete(`http://localhost:4000/aerolineas/${e.data.id_de_aerolinea}`).then(()=>toast.success("Se ha eliminado la aerolinea correctamente"));
  }

  const onUpdate = (e: any) => {
    axios.put(`http://localhost:4000/aerolineas/${e.data.id_de_aerolinea}`, e.data).then(x => toast.success("Se ha guardado la capacitación correctamente."));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nombreRef.current && descripcionRef.current) {
      const nombre = nombreRef.current.value;
      const descripcion = descripcionRef.current.value;

      axios({
        method: "post",
        url: "http://localhost:4000/aerolineas",
        data: {
          descripcion: descripcion,
          nombre: nombre
        } as CrearAerolineaDto,
        responseType: 'json'
      }).then(response => {
        fetchData();
        toast.success("Se ha creado la aerolínea correctamente.")
        
      })
      .catch(error => {
        toast.error("Ha ocurrido un error al crear la aerolínea.");
      });
    }
  };

  const fetchData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/aerolineas"
    }).then((response) => {
      setAerolineas(response.data);
    }).catch((error) => {
      console.error("Error fetching aerolineas data:", error);
      alert("Ha ocurrido un error al obtener las aerolíneas.");
    });
  };


useEffect(() => {
  console.log(aerolineasData);
  axios({
    method: "get",
    url: "http://localhost:4000/aerolineas"
  }).then((data)=>{
    setAerolineas(data.data);
  })
},[])


  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Aerolínea">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" ref={nombreRef} />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" id="descripcion" ref={descripcionRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
    
      <div style={{ marginTop: '20px',display:'flex', justifyContent:'center' }}>
        <AerolineasTable data={aerolineasData} onEdit={onUpdate} onDelete={onDelete}/>
      </div>
    </FormContainer>
  );
};

export default AerolineasForm;
