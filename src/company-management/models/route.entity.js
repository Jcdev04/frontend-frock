export class RouteEntity {
    constructor(id, origenId, destinoId, duracion, tarifa, frecuencia, origenNombre = '', destinoNombre = '') {
        this.id = id;
        this.origenId = origenId;
        this.destinoId = destinoId;
        this.duracion = duracion;
        this.tarifa = tarifa;
        this.frecuencia = frecuencia;
        this.origenNombre = origenNombre;
        this.destinoNombre = destinoNombre;
    }
}