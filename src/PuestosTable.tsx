import React from 'react';
import DataGrid, { Column, Editing, Texts, RequiredRule, Export } from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

interface PuestoTableProps {
  data: any[]; 
  onDelete: () =>void;
  onEdit: () =>void;
}

const EmpleadosTable: React.FC<PuestoTableProps> = ({ data,onDelete,onEdit }) => {
  const columns = [
    { name: 'id', title: 'id' },
    { name: 'nombre', title: 'nombre' },
    { name: 'descripcion', title: 'descripcion' },
    { name: 'salario', title: 'salario' },

  ];

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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Puestos.xlsx');
            });
    });
}

  return (
    <DataGrid dataSource={data} keyExpr={'id'} onExporting={onExporting} onRowRemoved={onDelete} onRowUpdated={onEdit} showColumnHeaders={true}>
      <Column dataField='id' caption='Id'></Column>
      <Column dataField='nombre' caption='Nombre'></Column>
      <Column dataField='descripcion' caption='Descripción'></Column>
      <Column dataField='salario' caption='Salario'></Column>
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
      <Export enabled={true}></Export>
    </DataGrid>
  );
};

export default EmpleadosTable;
