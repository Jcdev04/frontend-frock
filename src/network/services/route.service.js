import { RouteEntity } from '../models/route.entity.js';

export class RouteService {
    constructor() {
    }

    getAllRoutes() {
    }

    obtenerRuta(id) {
    }

    crearRuta(rutaData) {
        const nuevaRuta = new RouteEntity(
            null, // El ID se generará en el repositorio
            rutaData.origenId,
            rutaData.destinoId,
            rutaData.duracion,
            rutaData.tarifa,
            rutaData.frecuencia,
            rutaData.origenNombre,
            rutaData.destinoNombre
        );

    }

    actualizarRuta(ruta) {
    }

    eliminarRuta(id) {
    }
}