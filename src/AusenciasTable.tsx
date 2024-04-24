// AusenciasTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface AusenciasTableProps {
  data: any[]; 
  onEdit: (row: any) => void;
  onDelete: (id: number) => void;
}

const AusenciasTable: React.FC<AusenciasTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    { name: 'id empleado', title: 'id empleado' },
    { name: 'id', title: 'id' },
    { name: 'descripcion', title: 'descripcion' },
    { name: 'fecha inicio', title: 'fecha inicio' },
    { name: 'fecha final', title: 'fecha final' },
    { name: 'tipo', title: 'tipo' },


  ];

  return (
    <table>
      <thead>
        <tr>
          <th>id empleado</th>
          <th>id</th>
          <th>descripcion</th>
          <th>fecha inicio</th>
          <th>fecha final</th>
          <th>tipo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id_empleado}</td>
            <td>{row.id}</td>
            <td>{row.descripcion}</td>
            <td>{row.fecha_inicio}</td>
            <td>{row.fecha_final}</td>
            <td>{row.tipo}</td>
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
