import { BaseService } from '@/shared/services/base-service.js';
import { StopEntity } from '../models/stop.entity';
import {GeographyService} from "@/geography/services/geography.service.js";

export class StopService extends BaseService {
    constructor() {
        super('/stops');
        this.geographyService = new GeographyService();
        this.companyService = new BaseService('/companies');
    }

    /**
     * Obtiene paraderos por ID de compañía con información enriquecida
     * @param {string} companyId - ID de la compañía
     * @returns {Promise<Array>} Lista de paraderos con datos completos
     */
    async getStopsByCompanyId(companyId) {
        try {
            if (!companyId || typeof companyId !== 'string') {
                throw new Error('ID de compañía inválido');
            }

            const [stops, hierarchy] = await Promise.all([
                this.getAll(),
                this.geographyService.getFullHierarchy()
            ]);

            const companyStops = stops.filter(stop => stop.fk_id_company === companyId);

            return Promise.all(
                companyStops.map(async stop => {
                    const locationDetails = await this.geographyService.getLocationDetails(stop.fk_id_locality);
                    return {
                        ...stop,
                        location: locationDetails.fullPath,
                        companyName: await this._getCompanyName(stop.fk_id_company)
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
            const stops = await this.getAll();
            const companyStops = stops.filter(stop => stop.fk_id_company === companyId);
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
     * @param {string} id - ID del paradero
     * @returns {Promise<void>}
     */
    async deleteStop(id) {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('ID de paradero inválido');
            }
            await super.delete(id);
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    /**
     * Actualiza un paradero
     * @param {string} id - ID del paradero
     * @param {Object} updateData - Datos a actualizar
     * @returns {Promise<StopEntity>}
     */
    async updateStop(id, updateData) {
        try {
            // Validaciones
            if (!id || typeof id !== 'string') {
                throw new Error('ID de paradero inválido');
            }
            this._validateStopData(updateData);

            // Obtener datos actuales primero
            const current = await super.getById(id);
            const updatedData = { ...current, ...updateData };

            // Actualizar
            const response = await super.update(id, updatedData);
            return new StopEntity(
                response.id,
                response.name,
                response.google_maps_url,
                response.image_url,
                response.phone,
                response.fk_id_company,
                response.fk_id_locality,
                response.address,
                response.reference
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

            // Crear paradero
            const response = await super.create({
                id: stopData.id || `stop-${Date.now()}`,
                name: stopData.name,
                google_maps_url: stopData.google_maps_url || null,
                image_url: stopData.image_url || null,
                phone: stopData.phone,
                fk_id_company: stopData.fk_id_company,
                fk_id_locality: stopData.fk_id_locality,
                address: stopData.address,
                reference: stopData.reference
            });

            return new StopEntity(
                response.id,
                response.name,
                response.google_maps_url,
                response.image_url,
                response.phone,
                response.fk_id_company,
                response.fk_id_locality,
                response.address,
                response.reference
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
            fk_id_company: 'string',
            fk_id_locality: 'string',
            address: 'string',
            reference: 'string'
        };

        Object.entries(requiredFields).forEach(([field, type]) => {
            if (!data[field] || typeof data[field] !== type) {
                throw new Error(`Campo requerido: ${field} (debe ser ${type})`);
            }
        });
    }
}