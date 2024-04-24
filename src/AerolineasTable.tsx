// AerolineasTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface AerolineasTableProps {
  data: any[]; 
  onEdit: (row: any) => void; // Function to handle edit action
  onDelete: (id: number) => void; // Function to handle delete action
}

const AerolineasTable: React.FC<AerolineasTableProps> = ({ data,onEdit,onDelete }) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'nombre', title: 'Nombre' },
    { name: 'descripcion', title: 'Descripción' },
  ];
 return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id_de_aerolinea}</td>
            <td>{row.nombre}</td>
            <td>{row.descripcion}</td>
            <td>
              <button className="edit-button"  onClick={() => onEdit(row)}>Editar</button>
              <button className="delete-button" onClick={() => onDelete(row.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AerolineasTable;
