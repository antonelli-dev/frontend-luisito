// EmpleadosTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface PuestoTableProps {
  data: any[]; // Array of empleados data
}

const EmpleadosTable: React.FC<PuestoTableProps> = ({ data }) => {
  const columns = [
    { name: 'nombre', title: 'Nombre' },
    { name: 'descripcion', title: 'Descripcion' },
    { name: 'salario', title: 'Salario' },
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
