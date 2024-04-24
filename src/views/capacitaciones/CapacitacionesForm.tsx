import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../../FormContainer";
import "./CapacitacionesForm.css";
import { CapacitacionDto } from "./dtos/capacitacion.dto";
import axios from "axios";

import DataGrid, {
  Button, Column, Editing, Texts,
  ValidationRule
} from 'devextreme-react/data-grid';

interface CapacitacionesFormProps {
  onSubmit: null;
}

const CapacitacionesForm: React.FC<CapacitacionesFormProps> = ({ onSubmit }) => {

  const [capacitaciones, setCapacitaciones] = useState<CapacitacionDto[]>();

  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinalRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);
  const demoData = [ // Hardcoded demo data
    { id: 1, nombre: 'Capacitación 1', descripcion: 'Descripción de Capacitación 1', fecha_inicio: '2024-04-01', fecha_final: '2024-04-05' },
    { id: 2, nombre: 'Capacitación 2', descripcion: 'Descripción de Capacitación 2', fecha_inicio: '2024-04-10', fecha_final: '2024-04-12' },
    // Add more demo data as needed
  ];

  useEffect(() => {

    let data;
    axios.get("http://localhost:4000/capacitaciones").then((res: any) => {
      console.log("pet ", res)
      setCapacitaciones(res.data as CapacitacionDto[])
    }).catch();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    crearRegistro({
      descripcion: descripcionRef.current?.value,
      nombre: nombreRef.current?.value,
      fecha_final: fechaFinalRef.current?.value,
      fecha_inicio: fechaInicioRef.current?.value
    } as CapacitacionDto );
  };

  const crearRegistro = (e: CapacitacionDto) => {
    axios.post("http://localhost:4000/capacitaciones", e).then(x => alert("Se ha guardado la capacitación correctamente."));
  };

  const onDelete = (e: any) => {
    axios.delete(`http://localhost:4000/capacitaciones/${e.data.id}`)
  }

  const onUpdate = (e: any) => {
    alert(e.data.id)
    axios.put(`http://localhost:4000/capacitaciones/${e.data.id}`, e.data).then(x => alert("Se ha guardado la capacitación correctamente."));
  };

  function btnEditarTemplate(e: any): any {
    return (
      <>
        Editar
      </>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit} title="Añadir Capacitación">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" ref={nombreRef} />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" id="descripcion" ref={descripcionRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" ref={fechaInicioRef} />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFinal">Fecha de Finalización:</label>
        <input type="date" id="fechaFinal" ref={fechaFinalRef} />
      </div>
      <button type="submit" className="submit-button">Enviar</button>

      <DataGrid dataSource={capacitaciones} keyExpr={'id'} onRowRemoved={onDelete} onRowUpdated={onUpdate} >
        <Column dataField="id" caption="Id" allowEditing={false}></Column>
        <Column dataField="nombre" caption="Nombre">
          <ValidationRule type="required" message="El nombre es requerido"></ValidationRule>
        </Column>
        <Column dataField="descripcion" caption="Descripción">
        <ValidationRule type="required" message="La descripción es requerida"></ValidationRule>

        </Column>
        <Column dataField="fecha_inicio" caption="Fecha de inicio" dataType="date">
        <ValidationRule type="required" message="La fecha de inicio es requerida."></ValidationRule>

        </Column>
        <Column dataField="fecha_final" caption="Fecha final" dataType="date">
        <ValidationRule type="required" message="Fecha final"></ValidationRule>

        </Column>
        <Column caption="Acciones">
        <Button name="edit" template={btnEditarTemplate}></Button>
        </Column>
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}

        >
          <Texts
            editRow="Editar"
            saveRowChanges="Guardar"
            cancel="Cancelar"
            deleteRow="Eliminar"
          
          >
            
          </Texts>
          </Editing>
      </DataGrid>

      {/* <CapacitacionesTable data={demoData} /> */}
    </FormContainer>
  );
};

export default CapacitacionesForm;
