import { StopEntity } from '../models/stop.entity.js';
import http from '../../shared/services/http-common.js';

export class StopRepository {
    async getAllStops() {
        try {
            const { data } = await http.get('/stops');

            return data.map(item => new StopEntity(
                item.id,
                item.name,
                item.google_maps_url,
                item.image_url,
                item.phone,
                item.fk_id_company,
                item.fk_id_locality,
                item.address,
                item.reference
            ));
        } catch (error) {
            throw new Error(`Failed to fetch stops: ${error.message}`);
        }
    }

    async createStop(data) {
        try {
            const { data: created } = await http.post('/stops', {
                id: data.id,
                name: data.name,
                google_maps_url: data.google_maps_url || null,
                image_url: data.image_url || null,
                phone: data.phone,
                fk_id_company: data.fk_id_company,
                fk_id_locality: data.fk_id_locality,
                address: data.address,
                reference: data.reference
            });

            return new StopEntity(
                created.id,
                created.name,
                created.google_maps_url,
                created.image_url,
                created.phone,
                created.fk_id_company,
                created.fk_id_locality,
                created.address,
                created.reference
            );
        } catch (error) {
            throw new Error(`Failed to create stop: ${error.message}`);
        }
    }

    async updateStop(id, data) {
        try {
            // Obtener el paradero original
            const { data: original } = await http.get(`/stops/${id}`);
            // Combinar datos nuevos con originales
            const updatedData = {
                id,
                name: data.name,
                phone: data.phone,
                address: data.address,
                reference: data.reference,
                google_maps_url: original.google_maps_url,
                image_url: original.image_url,
                fk_id_company: data.fk_id_company,
                fk_id_locality: data.fk_id_locality
            };
            // Enviar PUT con el objeto completo
            const { data: updated } = await http.put(`/stops/${id}`, updatedData);
            return new StopEntity(
                updated.id,
                updated.name,
                updated.google_maps_url,
                updated.image_url,
                updated.phone,
                updated.fk_id_company,
                updated.fk_id_locality,
                updated.address,
                updated.reference
            );
        } catch (error) {
            throw new Error(`Failed to update stop: ${error.message}`);
        }
    }

    async deleteStop(id) {
        try {
            await http.delete(`/stops/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete stop: ${error.message}`);
        }
    }


    async getCompanies() {
        try {
            const { data } = await http.get('/companies');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch companies: ${error.message}`);
        }
    }

    async getLocalities() {
        try {
            const { data } = await http.get('/localities');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch localities: ${error.message}`);
        }
    }

    async getDistricts() {
        try {
            const { data } = await http.get('/districts');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch districts: ${error.message}`);
        }
    }

    async getProvinces() {
        try {
            const { data } = await http.get('/provinces');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch provinces: ${error.message}`);
        }
    }

    async getRegions() {
        try {
            const { data } = await http.get('/regions');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch regions: ${error.message}`);
        }
    }
}