import { RutaRepository } from '../../infrastructure/repositories/RutaRepository';

export class RutaService {
    constructor() {
        this.rutaRepository = new RutaRepository();
    }

    obtenerRutas() {
        return this.rutaRepository.obtenerTodas();
    }

    obtenerRuta(id) {
        return this.rutaRepository.obtenerPorId(id);
    }

    crearRuta(ruta) {
        return this.rutaRepository.guardar(ruta);
    }

    actualizarRuta(ruta) {
        return this.rutaRepository.actualizar(ruta);
    }

    eliminarRuta(id) {
        return this.rutaRepository.eliminar(id);
    }
}