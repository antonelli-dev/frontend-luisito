// AerolineasTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface AerolineasTableProps {
  data: any[]; // Array of aerolineas data
}

const AerolineasTable: React.FC<AerolineasTableProps> = ({ data }) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'nombre', title: 'Nombre' },
    { name: 'descripcion', title: 'Descripción' },
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

export default AerolineasTable;
