import { RouteRepository } from './route.repository.js';
import { RouteEntity } from '../../models/route.entity.js';

export class RouteService {
    constructor() {
        this.rutaRepository = new RouteRepository();
    }

    obtenerRutas() {
        return this.rutaRepository.obtenerTodas();
    }

    obtenerRuta(id) {
        return this.rutaRepository.obtenerPorId(id);
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

        return this.rutaRepository.guardar(nuevaRuta);
    }

    actualizarRuta(ruta) {
        return this.rutaRepository.actualizar(ruta);
    }

    eliminarRuta(id) {
        return this.rutaRepository.eliminar(id);
    }
}