import { RutaRepository } from '../../infrastructure/repositories/RutaRepository';
import { Ruta } from '../../domain/models/Ruta';

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

    crearRuta(rutaData) {
        const nuevaRuta = new Ruta(
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