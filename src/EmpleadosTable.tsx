import React from 'react';
import './TableButton.css'

interface EmpleadosTableProps {
  data: any[]; // Array of empleados data
  onEdit: (row: any) => void; // Function to handle edit action
  onDelete: (id: number) => void; // Function to handle delete action
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Género</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo Electrónico</th>
          <th>ID de Aerolínea</th>
          <th>ID de Puesto</th>
          <th>Fecha de Contratación</th>
          <th>Salario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.nombres}</td>
            <td>{row.apellidos}</td>
            <td>{row.fecha_nacimiento}</td>
            <td>{row.genero}</td>
            <td>{row.direccion}</td>
            <td>{row.telefono}</td>
            <td>{row.correo_electronico}</td>
            <td>{row.aerolinea_id}</td>
            <td>{row.puesto_id}</td>
            <td>{row.fecha_contratacion}</td>
            <td>{row.salario}</td>
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

export default EmpleadosTable;
