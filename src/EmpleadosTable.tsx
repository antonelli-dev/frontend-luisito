import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Texts,
  RequiredRule,
  Export,
} from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';


interface EmpleadosTableProps {
  data: any[]; 
  onEdit: (e: any) => void; 
  onDelete: (e: any) => void; 
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ data, onEdit, onDelete }) => {

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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Empleados.xlsx');
            });
    });
}

  return (
    <DataGrid
      dataSource={data}
      keyExpr="id"
      showBorders={true}
      onRowRemoved={onDelete}
      onRowUpdated={onEdit}
      onExporting={onExporting}
    >
      <Column dataField="id" caption="ID" allowEditing={false} />
      <Column dataField="nombres" caption="Nombres">
        <RequiredRule />
      </Column>
      <Column dataField="apellidos" caption="Apellidos">
        <RequiredRule />
      </Column>
      <Column dataField="fecha_nacimiento" caption="Fecha de Nacimiento" dataType="date" />
      <Column dataField="genero" caption="Género">
        <RequiredRule />
      </Column>
      <Column dataField="direccion" caption="Dirección" />
      <Column dataField="telefono" caption="Teléfono" />
      <Column dataField="correo_electronico" caption="Correo Electrónico" />
      <Column dataField="aerolinea.nombre" caption="ID de Aerolínea" />
      <Column dataField="puesto.nombre" caption="ID de Puesto" />
      <Column dataField="fecha_contratacion" caption="Fecha de Contratación" dataType="date" />
      <Column dataField="salario" caption="Salario" dataType="number" />
      <Export enabled={true} />
      
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
        />
      </Editing>
    </DataGrid>
  );
};

export default EmpleadosTable;
