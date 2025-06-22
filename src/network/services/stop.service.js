import { BaseService } from '@/shared/services/base-service.js';
import { StopEntity } from '../models/stop.entity';
import { GeographyService } from "@/geography/services/geography.service.js";

export class StopService extends BaseService {
    constructor() {
        super('stops');
        this.geographyService = new GeographyService();
        this.companyService = new BaseService('companies');
    }

    /**
     * Obtiene paraderos por ID de compañía con información enriquecida
     * @param {int} companyId - ID de la compañía
     * @returns {Promise<Array>} Lista de paraderos con datos completos
     */
    async getStopsByCompanyId(companyId) {
        try {

            // Usar el endpoint específico en lugar de obtener todos y filtrar
            const response = await this.http.get(`${this.resourcePath()}/company/${companyId}`); //el endpoint para obtner stops por companyId /api/stops/company/:companyId
            const stops = response.data;

            // Obtener la jerarquía para enriquecer los datos
            const hierarchy = await this.geographyService.getFullHierarchy();

            // Enriquecer cada paradero con información adicional
            return Promise.all(
                stops.map(async stop => {
                    const locationDetails = await this.geographyService.getLocationDetails(stop.fkIdLocality);
                    return {
                        ...stop,
                        location: locationDetails.fullPath,
                        companyName: await this._getCompanyName(stop.fkIdCompany)
                    };
                })
            );
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    /**
     * Obtiene paraderos formateados para uso en componentes de selección (Dropdown/Select)
     * @param {string} companyId - ID de la compañía
     * @returns {Promise<Array<{label: string, value: string}>>}
     */
    async getStopsForSelect(companyId) {
        try {
            if (!companyId || typeof companyId !== 'string') {
                throw new Error('ID de compañía inválido');
            }

            // Solo obtenemos los datos básicos necesarios

            //Amir modified: Voy a ajustarlo para usar el endpoint específico que ya existe en el backend para obtener los paraderos de una compañía
            //Para que ya no uses filtrado en el frontend

            //No borrare lo antiguo por si acaso
            //const stops = await this.getAll();
            // companyStops = stops.filter(stop => stop.fk_id_company === companyId);

            //nuevo:
            const response = await this.http.get(`${this.resourcePath()}/company/${companyId}`);
            const companyStops = response.data;

            //NOTA EXTRA:
            //Siempre revisar los atributos que se reciben del backend, por lo general parece ser distinto a la estuctura del modelo del front
            //Ej: puede que exista fk_id_company en el frontEnd pero en el modelo del Backend este como fkIdCompany
            //Por eso es importante usar Console Logs

            // Formateamos para PrimeVue Select
            return companyStops.map(stop => ({
                label: stop.name, // Lo que se mostrará en el select
                value: stop.id,   // El valor que se guardará
            }));
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    /**
     * Elimina un paradero
     * @param {int} id - ID del paradero
     * @returns {Promise<void>}
     */
    async deleteStop(id) {
        try {
            // Validaciones
            if (!id || typeof id !== 'number' ||
                !Number.isInteger(id) ||
                id < 0) {
                throw new Error('ID de paradero inválido');
            }
            await super.delete(id);
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    /**
     * Actualiza un paradero
     * @param {int} id - ID del paradero
     * @param {Object} updateData - Datos a actualizar
     * @returns {Promise<StopEntity>}
     */
    async updateStop(id, updateData) {
        try {

            // Validaciones
            if (!id || typeof id !== 'number' ||
                !Number.isInteger(id) ||
                id < 0) {
                throw new Error('ID de paradero inválido');
            }
            this._validateStopData(updateData);

            const companyId = this._getCompanyIdFromLocalStorage();

            // Obtener datos actuales primero
            const current = await super.getById(id);

            //REDEFINIR EL OBJETO PARA QUE COINCIDA CON EL MODELO DEL BACKEND

            const updatedData = { //asegurarse de que los campos coincidan con el modelo del backend
                id: Number(current.id), //se mantiene el id actual
                name: updateData.name, //update
                googleMapsUrl: current.googleMapsUrl,
                imageUrl: current.imageUrl,
                phone: updateData.phone, //update
                fkIdCompany: Number(companyId),
                address: updateData.address, //update
                reference: updateData.reference, //update
                fkIdLocality: updateData.fk_id_locality //update

                //hay una gran diferencia entre el modelo del front y el del backend, por lo que se debe tener cuidado con los campos que se actualizan
                //es bueno aclarar que para current se obtiene el objeto completo del backend, mientras que para updateData se obtienen solo los campos que se desean actualizar y esos atributos tienen nombres diferentes
            };


            // Actualizar
            const response = await super.update(id, updatedData);


            //retorno del objeto creado del backend
            return new StopEntity(
                response.id,
                response.name,
                response.googleMapsUrl,
                response.imageUrl,
                response.phone,
                response.fkIdCompany,
                response.fkIdLocality,
                response.address,
                response.reference,
            );
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    /**
     * Crea un nuevo paradero
     * @param {Object} stopData - Datos del paradero
     * @returns {Promise<StopEntity>}
     */
    async createStop(stopData) {
        try {
            // Validaciones
            this._validateStopData(stopData);


            const companyId = this._getCompanyIdFromLocalStorage();


            // Crear paradero
            const response = await super.create({ // se ordena segun el post del backend
                name: stopData.name,
                googleMapsUrl: stopData.google_maps_url || 'null',
                imageUrl: stopData.image_url || 'null',
                phone: stopData.phone,
                fkIdCompany: Number(companyId),
                address: stopData.address,
                reference: stopData.reference,
                fkIdLocality: stopData.fk_id_locality
            });

            console.log("Paradero", response);


            //EXTRA
            return new StopEntity( //el modelo del stopentity del front pero sacaremos los datos del nuevo response del backend
                response.id,
                response.name,
                response.googleMapsUrl,
                response.imageUrl,
                response.phone,
                response.fkIdCompany,
                response.fkIdLocality,
                response.address,
                response.reference,
        );
        } catch (error) {
            throw this._enhanceError(error);
        }
    }


    async _getCompanyName(companyId) {
        try {
            const company = await this.companyService.getById(companyId);
            return company?.name || 'Desconocido';
        } catch {
            return 'Desconocido';
        }
    }

    _validateStopData(data) {
        const requiredFields = {
            name: 'string',
            phone: 'string',
            fk_id_locality: 'string',
            address: 'string',
            reference: 'string'
        };

        Object.entries(requiredFields).forEach(([field, type]) => {
            if (!data[field] || typeof data[field] !== type) {
                throw new Error(`Campo requerido: ${field} (debe ser ${type})`);
            }
        });

        // Validación específica para fk_id_company como número entero
        if (!data.fk_id_company ||
            typeof data.fk_id_company !== 'number' ||
            !Number.isInteger(data.fk_id_company) ||
            data.fk_id_company < 0) {
            throw new Error('El campo fk_id_company debe ser un número entero positivo');
        }
    }

    _getCompanyIdFromLocalStorage() {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (!userData || !userData.companyId) {
                throw new Error('No se encontró ID de compañía en el usuario autenticado');
            }
            return Number(userData.companyId);
        } catch (error) {
            console.error('Error al obtener companyId del localStorage:', error);
            throw new Error('No se pudo obtener el ID de la compañía');
        }
    }
}