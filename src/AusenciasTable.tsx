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

interface AusenciasTableProps {
  data: any[];
  onEdit: (e: any) => void;
  onDelete: (e: any) => void; 
}

const AusenciasTable: React.FC<AusenciasTableProps> = ({ data, onEdit, onDelete }) => {

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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Ausencias.xlsx');
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
      <Column dataField="id_empleado" caption="ID Empleado" allowEditing={false} />
      <Column dataField="id" caption="ID" allowEditing={false} />
      <Column dataField="descripcion" caption="Descripción">
        <RequiredRule />
      </Column>
      <Column dataField="fecha_inicio" caption="Fecha Inicio" dataType="date" />
      <Column dataField="fecha_final" caption="Fecha Final" dataType="date" />
      <Column dataField="tipo" caption="Tipo">
        <RequiredRule />
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
        />
      </Editing>
    </DataGrid>
  );
};

export default AusenciasTable;

    // <table>
    //   <thead>
    //     <tr>
    //       <th>id empleado</th>
    //       <th>id</th>
    //       <th>descripcion</th>
    //       <th>fecha inicio</th>
    //       <th>fecha final</th>
    //       <th>tipo</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((row) => (
    //       <tr key={row.id}>
    //         <td>{row.id_empleado}</td>
    //         <td>{row.id}</td>
    //         <td>{row.descripcion}</td>
    //         <td>{row.fecha_inicio}</td>
    //         <td>{row.fecha_final}</td>
    //         <td>{row.tipo}</td>
    //         <td>
    //           {/* <button className="edit-button"  onClick={() => onEdit(row)}>editar</button> */}
    //           {/* <button className="delete-button" onClick={() => onDelete(row.id)}>Eliminar</button> */}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

