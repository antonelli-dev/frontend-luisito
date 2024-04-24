import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Texts,
  RequiredRule,
} from 'devextreme-react/data-grid';

interface EmpleadosTableProps {
  data: any[]; 
  onEdit: (e: any) => void; 
  onDelete: (e: any) => void; 
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <DataGrid
      dataSource={data}
      keyExpr="id"
      showBorders={true}
      onRowRemoved={onDelete}
      onRowUpdated={onEdit}
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
      <Column dataField="aerolinea_id" caption="ID de Aerolínea" />
      <Column dataField="puesto_id" caption="ID de Puesto" />
      <Column dataField="fecha_contratacion" caption="Fecha de Contratación" dataType="date" />
      <Column dataField="salario" caption="Salario" dataType="number" />
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
