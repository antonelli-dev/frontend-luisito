import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../../FormContainer";
import "./CapacitacionesForm.css";
import { CapacitacionDto } from "./dtos/capacitacion.dto";
import axios from "axios";

import DataGrid, {
  Button,
  Column,
  Editing,
  Export,
  Texts,
  ValidationRule,
} from "devextreme-react/data-grid";

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { toast } from "sonner";

interface CapacitacionesFormProps {
  onSubmit: null;
}

const CapacitacionesForm: React.FC<CapacitacionesFormProps> = ({
  onSubmit,
}) => {
  const [capacitaciones, setCapacitaciones] = useState<CapacitacionDto[]>();

  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const fechaInicioRef = useRef<HTMLInputElement>(null);
  const fechaFinalRef = useRef<HTMLInputElement>(null);
  const [showTable, setShowTable] = useState(false);

  function onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function(options) {
            options.excelCell.font = { name: 'Arial', size: 12 };
            options.excelCell.alignment = { horizontal: 'left' };
        } 
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Aerolineas.xlsx');
            });
    });
}

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    crearRegistro({
      descripcion: descripcionRef.current?.value,
      nombre: nombreRef.current?.value,
      fecha_final: fechaFinalRef.current?.value,
      fecha_inicio: fechaInicioRef.current?.value,
    } as CapacitacionDto);
  };

  const fetchData = () => {
    axios
    .get("http://localhost:4000/capacitaciones")
    .then((res: any) => {
      setCapacitaciones(res.data as CapacitacionDto[]);
    })
    .catch();
  };

  const crearRegistro = (e: CapacitacionDto) => {
    axios.post("http://localhost:4000/capacitaciones", e).then((x) => {
      fetchData();
      toast.success("Se ha guardado la capacitación correctamente.");
    });
  };

  const onDelete = (e: any) => {
    axios.delete(`http://localhost:4000/capacitaciones/${e.data.id}`).then(()=> toast.success("Se ha eliminado la capacitación correctamente"));
  };

  const onUpdate = (e: any) => {
    axios
      .put(`http://localhost:4000/capacitaciones/${e.data.id}`, e.data)
      .then((x) => toast.success("Se ha guardado la capacitación correctamente."));
  };

  function btnEditarTemplate(e: any): any {
    return <>Editar</>;
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
      <button type="submit" className="submit-button">
        Enviar
      </button>

      <DataGrid
        dataSource={capacitaciones}
        keyExpr={"id"}
        onRowRemoved={onDelete}
        onRowUpdated={onUpdate}
        showColumnHeaders={true}
        onExporting={onExporting}
      >
        <Column dataField="id" caption="Id" allowEditing={false}></Column>
        <Column dataField="nombre" caption="Nombre">
          <ValidationRule
            type="required"
            message="El nombre es requerido"
          ></ValidationRule>
        </Column>
        <Column dataField="descripcion" caption="Descripción">
          <ValidationRule
            type="required"
            message="La descripción es requerida"
          ></ValidationRule>
        </Column>
        <Column
          dataField="fecha_inicio"
          caption="Fecha de inicio"
          dataType="date"
        >
          <ValidationRule
            type="required"
            message="La fecha de inicio es requerida."
          ></ValidationRule>
        </Column>
        <Column dataField="fecha_final" caption="Fecha final" dataType="date">
          <ValidationRule
            type="required"
            message="Fecha final"
          ></ValidationRule>
        </Column>

        <Editing mode="row" allowUpdating={true} allowDeleting={true}>
          <Texts
            editRow="Editar"
            saveRowChanges="Guardar"
            cancel="Cancelar"
            deleteRow="Eliminar"
          ></Texts>
        </Editing>
        <Export enabled={true} />
      </DataGrid>

      {/* <CapacitacionesTable data={demoData} /> */}
    </FormContainer>
  );
};

export default CapacitacionesForm;
