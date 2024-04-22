// AusenciasTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface AusenciasTableProps {
  data: any[]; 
}

const AusenciasTable: React.FC<AusenciasTableProps> = ({ data }) => {
  const columns = [
    { name: 'nombre', title: 'Nombre' },
    { name: 'tipo', title: 'Tipo' },
    { name: 'fecha_inicio', title: 'Fecha de Inicio' },
    { name: 'fecha_fin', title: 'Fecha de Fin' },
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

export default AusenciasTable;
