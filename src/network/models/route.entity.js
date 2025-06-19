export class RouteEntity {
    constructor(id, origenId, destinoId, duracion, tarifa, frecuencia, origenNombre = '', destinoNombre = '') {
        this.id = id;
        this.duracion = duracion;
        this.tarifa = tarifa;
        this.frecuencia = frecuencia;
    }
}