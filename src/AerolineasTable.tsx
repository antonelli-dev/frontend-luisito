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
  <Column dataField="id" caption="Id" allowEditing={false}></Column>
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

    // <table>
    //   <thead>
    //     <tr>
    //       <th>ID</th>
    //       <th>Nombre</th>
    //       <th>Descripción</th>
    //       <th>Acciones</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((row) => (
    //       <tr key={row.id}>
    //         <td>{row.id_de_aerolinea}</td>
    //         <td>{row.nombre}</td>
    //         <td>{row.descripcion}</td>
    //         <td>
    //           <button className="edit-button"  onClick={() => onEdit(row)}>Editar</button>
    //           <button className="delete-button" onClick={() => onDelete(row.id)}>Eliminar</button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

export default AerolineasTable;
