export class CrearAusenciaDTO {
    id_empleado: number= 0;
    tipo: string="";
    descripcion: string="";
    fecha_inicio: Date= new Date();
    fecha_final: Date= new Date();

}