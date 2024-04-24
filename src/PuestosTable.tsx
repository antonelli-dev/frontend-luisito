// EmpleadosTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface PuestoTableProps {
  data: any[]; 
  onDelete: () =>void;
  onEdit: () =>void;
}

const EmpleadosTable: React.FC<PuestoTableProps> = ({ data,onDelete,onEdit }) => {
  const columns = [
    { name: 'id', title: 'id' },
    { name: 'nombre', title: 'nombre' },
    { name: 'descripcion', title: 'descripcion' },
    { name: 'salario', title: 'salario' },

  ];

  return (
    <Grid
      rows={data}
      columns={columns}
    >
      <Table />
      <TableHeaderRow />
    </Grid>
  );
};

export default EmpleadosTable;
