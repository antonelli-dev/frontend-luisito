// CapacitacionesTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface CapacitacionesTableProps {
  data: any[]; // Array of capacitaciones data
}

const CapacitacionesTable: React.FC<CapacitacionesTableProps> = ({ data }) => {
  const columns = [
    { name: 'nombre', title: 'Nombre' },
    { name: 'descripcion', title: 'Descripción' },
    { name: 'fecha_inicio', title: 'Fecha de Inicio' },
    { name: 'fecha_final', title: 'Fecha de Finalización' },
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

export default CapacitacionesTable;
