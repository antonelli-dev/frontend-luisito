import React from 'react';
import DataGrid, { Column, Editing, Texts, RequiredRule, Export } from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

interface HistorialLaboralTableProps {
  data: any[]; 
  onEdit: (e: any) => void; 
  onDelete: (e: any) => void; 
}

const HistorialLaboralTable: React.FC<HistorialLaboralTableProps> = ({ data, onEdit, onDelete }) => {

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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'HistorialLaboral.xlsx');
            });
    });
}

  return (
    <DataGrid
      dataSource={data}
      keyExpr="id_de_historial"
      showBorders={true}
      onRowRemoved={onDelete}
      onRowUpdated={onEdit}
      onExporting={onExporting}
    >
      <Column dataField="id_de_historial" caption="ID" allowEditing={false} />
      <Column dataField="fecha_inicio" caption="Fecha de Inicio" dataType="date" />
      <Column dataField="empleado.nombres" caption="ID de Empleado" />
      <Column dataField="puesto.nombre" caption="ID de Puesto" />
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
      <Export enabled={true} ></Export>
    </DataGrid>
  );
};

export default HistorialLaboralTable;
