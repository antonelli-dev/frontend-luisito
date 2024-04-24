export class CrearEmpleadoDto {
    nombres: string='';
    apellidos: string='';
    fecha_nacimiento: Date= new Date();
    genero: string='';
    direccion: string='';
    telefono: string='';
    correo_electronico: string='';
    aerolinea_id: number=0;
    puesto_id: number=0;
    fecha_contratacion: Date= new Date();
    salario: number=0;
};