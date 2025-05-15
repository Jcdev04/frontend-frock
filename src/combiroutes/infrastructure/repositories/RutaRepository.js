import { Ruta } from '../../domain/models/Ruta';

export class RutaRepository {
    constructor() {
        // Simulación de datos
        this.rutas = [
            new Ruta(1, 1, 2, 20, 8.00, 20),
            new Ruta(2, 3, 4, 20, 8.00, 20),
            new Ruta(3, 5, 6, 20, 8.00, 20)
        ];
    }

    obtenerTodas() {
        return Promise.resolve(this.rutas);
    }

    obtenerPorId(id) {
        const ruta = this.rutas.find(r => r.id === id);
        return Promise.resolve(ruta);
    }

    guardar(ruta) {
        const newId = Math.max(...this.rutas.map(r => r.id)) + 1;
        const newRuta = new Ruta(
            newId,
            ruta.origenId,
            ruta.destinoId,
            ruta.duracion,
            ruta.tarifa,
            ruta.frecuencia
        );
        this.rutas.push(newRuta);
        return Promise.resolve(newRuta);
    }

    actualizar(ruta) {
        const index = this.rutas.findIndex(r => r.id === ruta.id);
        if (index !== -1) {
            this.rutas[index] = ruta;
            return Promise.resolve(ruta);
        }
        return Promise.reject(new Error('Ruta no encontrada'));
    }

    eliminar(id) {
        const index = this.rutas.findIndex(r => r.id === id);
        if (index !== -1) {
            this.rutas.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.reject(new Error('Ruta no encontrada'));
    }
}