// AerolineasTable.tsx
import React from 'react';

import DataGrid, {
  Button, Column, Editing, Export, Texts,
  ValidationRule
} from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

interface AerolineasTableProps {
  data: any[];
  onEdit: (e: any) => void; // Function to handle edit action
  onDelete: (e: any) => void; // Function to handle delete action
}

const AerolineasTable: React.FC<AerolineasTableProps> = ({ data, onEdit, onDelete }) => {

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
  return (
    <DataGrid dataSource={data} keyExpr={'id_de_aerolinea'} onExporting={onExporting} onRowRemoved={onDelete} onRowUpdated={onEdit} showColumnHeaders={true} >
      <Column dataField="id_de_aerolinea" caption="Id" allowEditing={false}></Column>
      <Column dataField="nombre" caption="Nombre">
        <ValidationRule type="required" message="El nombre es requerido"></ValidationRule>
      </Column>
      <Column dataField="descripcion" caption="Descripción">
        <ValidationRule type="required" message="La descripción es requerida"></ValidationRule>

      </Column>

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
        >
        </Texts>
      </Editing>
    </DataGrid>
  );
};

export default AerolineasTable;
