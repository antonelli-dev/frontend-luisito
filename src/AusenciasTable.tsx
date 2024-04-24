// AusenciasTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface AusenciasTableProps {
  data: any[]; 
  onEdit: () => void;
  onDelete: () => void;
}

const AusenciasTable: React.FC<AusenciasTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    { name: 'nombre', title: 'Nombre' },
    { name: 'tipo', title: 'Tipo' },
    { name: 'fecha_inicio', title: 'Fecha de Inicio' },
    { name: 'fecha_fin', title: 'Fecha de Fin' },
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

export default AusenciasTable;
