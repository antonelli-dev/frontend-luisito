// AerolineasTable.tsx
import React from 'react';

import DataGrid, {
  Button, Column, Editing, Texts,
  ValidationRule
} from 'devextreme-react/data-grid';

interface AerolineasTableProps {
  data: any[]; 
  onEdit: (e: any) => void; // Function to handle edit action
  onDelete: (e: any) => void; // Function to handle delete action
}

const AerolineasTable: React.FC<AerolineasTableProps> = ({ data,onEdit,onDelete }) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'nombre', title: 'Nombre' },
    { name: 'descripcion', title: 'Descripción' },
  ];


 return (
  <DataGrid dataSource={data} keyExpr={'id_de_aerolinea'} onRowRemoved={onDelete} onRowUpdated={onEdit}  showColumnHeaders={true} >
  <Column dataField="id_de_aerolinea" caption="Id" allowEditing={false}></Column>
  <Column dataField="nombre" caption="Nombre">
    <ValidationRule type="required" message="El nombre es requerido"></ValidationRule>
  </Column>
  <Column dataField="descripcion" caption="Descripción">
  <ValidationRule type="required" message="La descripción es requerida"></ValidationRule>

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
  );
};

export default AerolineasTable;
