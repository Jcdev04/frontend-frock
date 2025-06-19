// dominio/entities/Route.js
export class Route {
    constructor(id, duracion, tarifa, frecuencia, stopsIds = [], scheduleIds = []) {
        this.id = id;
        this.duracion = duracion;
        this.tarifa = tarifa;
        this.frecuencia = frecuencia;
        this.stopsIds = stopsIds;        // [1, 2, 5…]
        this.scheduleIds = scheduleIds;  // [10, 12…]
    }

}
