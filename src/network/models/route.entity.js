// dominio/entities/Route.js
export class RouteEntity {
    constructor(id, duracion, tarifa, frecuencia, stopsIds = [], schedules = []) {
        this.id = id;
        this.duracion = duracion;
        this.tarifa = tarifa;
        this.frecuencia = frecuencia;
        this.stopsIds = stopsIds;
        this.schedules = schedules;
    }
}
