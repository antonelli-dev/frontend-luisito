// EmpleadosTable.tsx
import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

interface EmpleadosTableProps {
  data: any[]; // Array of empleados data
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ data }) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'nombres', title: 'Nombres' },
    { name: 'apellidos', title: 'Apellidos' },
    { name: 'fecha_nacimiento', title: 'Fecha de Nacimiento' },
    { name: 'genero', title: 'Género' },
    { name: 'direccion', title: 'Dirección' },
    { name: 'telefono', title: 'Teléfono' },
    { name: 'correo_electronico', title: 'Correo Electrónico' },
    { name: 'aerolinea_id', title: 'ID de Aerolínea' },
    { name: 'puesto_id', title: 'ID de Puesto' },
    { name: 'fecha_contratacion', title: 'Fecha de Contratación' },
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
