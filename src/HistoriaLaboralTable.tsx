import React from 'react';
import DataGrid, { Column, Editing, Texts, RequiredRule } from 'devextreme-react/data-grid';

interface HistorialLaboralTableProps {
  data: any[]; 
  onEdit: (e: any) => void; 
  onDelete: (e: any) => void; 
}

const HistorialLaboralTable: React.FC<HistorialLaboralTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <DataGrid
      dataSource={data}
      keyExpr="id_de_historial"
      showBorders={true}
      onRowRemoved={onDelete}
      onRowUpdated={onEdit}
    >
      <Column dataField="id_de_historial" caption="ID" allowEditing={false} />
      <Column dataField="fecha_inicio" caption="Fecha de Inicio" dataType="date" />
      <Column dataField="id_empleado" caption="ID de Empleado" />
      <Column dataField="id_de_puesto" caption="ID de Puesto" />
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

export default HistorialLaboralTable;
