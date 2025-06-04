import { StopEntity } from '../../models/stop.entity.js';
import http from '../../../shared/services/http-common.js';

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
                item.fk_id_location
            ));
        } catch (error) {
            throw new Error(`Failed to fetch stops: ${error.message}`);
        }
    }

    async createStop(data) {
        try {
            const { data: created } = await http.post('/stops', {
                ...data,
                google_maps_url: null,
                image_url: null,
                phone: data.phone || ''
            });

            return new StopEntity(
                created.id,
                created.name,
                created.google_maps_url,
                created.image_url,
                created.phone,
                created.fk_id_company,
                created.fk_id_location
            );
        } catch (error) {
            throw new Error(`Failed to create stop: ${error.message}`);
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

    async getLocations() {
        try {
            const { data } = await http.get('/locations');
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch locations: ${error.message}`);
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