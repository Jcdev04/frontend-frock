export class Ruta {
    constructor(id, origenId, destinoId, duracion, tarifa, frecuencia) {
        this.id = id;
        this.origenId = origenId;
        this.destinoId = destinoId;
        this.duracion = duracion;
        this.tarifa = tarifa;
        this.frecuencia = frecuencia;
    }
}