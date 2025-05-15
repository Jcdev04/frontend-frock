import { Ruta } from '../../domain/models/Ruta';

export class RutaRepository {
    constructor() {
        this.storageKey = 'combiroutes_rutas';
        this.rutas = this.cargarRutasDesdeStorage();

        // Si no hay rutas en localStorage, inicializamos con datos de ejemplo
        if (this.rutas.length === 0) {
            this.rutas = [
                new Ruta(1, 1, 2, 20, 8.00, 20, 'Paradero A', 'Paradero B'),
                new Ruta(2, 3, 4, 20, 8.00, 20, 'Paradero C', 'Paradero D'),
                new Ruta(3, 5, 6, 20, 8.00, 20, 'Paradero E', 'Paradero F')
            ];
            this.guardarRutasEnStorage();
        }
    }

    cargarRutasDesdeStorage() {
        const rutasJson = localStorage.getItem(this.storageKey);
        if (!rutasJson) return [];

        try {
            const rutasData = JSON.parse(rutasJson);
            return rutasData.map(data => new Ruta(
                data.id,
                data.origenId,
                data.destinoId,
                data.duracion,
                data.tarifa,
                data.frecuencia,
                data.origenNombre,
                data.destinoNombre
            ));
        } catch (error) {
            console.error('Error al cargar rutas desde localStorage:', error);
            return [];
        }
    }

    guardarRutasEnStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.rutas));
        } catch (error) {
            console.error('Error al guardar rutas en localStorage:', error);
        }
    }

    obtenerTodas() {
        return Promise.resolve([...this.rutas]);
    }

    obtenerPorId(id) {
        const ruta = this.rutas.find(r => r.id === id);
        return Promise.resolve(ruta ? { ...ruta } : null);
    }

    guardar(ruta) {
        const newId = Math.max(...this.rutas.map(r => r.id), 0) + 1;
        const newRuta = new Ruta(
            newId,
            ruta.origenId,
            ruta.destinoId,
            ruta.duracion,
            ruta.tarifa,
            ruta.frecuencia,
            ruta.origenNombre,
            ruta.destinoNombre
        );
        this.rutas.push(newRuta);
        this.guardarRutasEnStorage();
        return Promise.resolve({ ...newRuta });
    }

    actualizar(ruta) {
        const index = this.rutas.findIndex(r => r.id === ruta.id);
        if (index !== -1) {
            this.rutas[index] = ruta;
            this.guardarRutasEnStorage();
            return Promise.resolve({ ...ruta });
        }
        return Promise.reject(new Error('Ruta no encontrada'));
    }

    eliminar(id) {
        const index = this.rutas.findIndex(r => r.id === id);
        if (index !== -1) {
            this.rutas.splice(index, 1);
            this.guardarRutasEnStorage();
            return Promise.resolve(true);
        }
        return Promise.reject(new Error('Ruta no encontrada'));
    }
}