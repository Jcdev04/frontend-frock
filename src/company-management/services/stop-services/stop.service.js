import { StopRepository } from './stop.repository.js';

export class StopService {
    #repository = new StopRepository();

    /**
     * Obtiene todos los paraderos enriquecidos con nombres de empresa y ubicación.
     * @returns {Promise<Object[]>} Lista de paraderos para la UI.
     */
    async getStops() {
        try {
            const stops = await this.#repository.getAllStops();
            const companies = await this.#repository.getCompanies();
            const locations = await this.#repository.getLocations();
            const localities = await this.#repository.getLocalities();
            const districts = await this.#repository.getDistricts();
            const provinces = await this.#repository.getProvinces();
            const regions = await this.#repository.getRegions();

            const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
            const locationMap = Object.fromEntries(locations.map(l => [l.id, l]));
            const localityMap = Object.fromEntries(localities.map(l => [l.id, l]));
            const districtMap = Object.fromEntries(districts.map(d => [d.id, d]));
            const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p]));
            const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

            return stops.map(stop => {
                const location = locationMap[stop.fk_id_location] || { reference: 'Desconocido', fk_id_locality: null };
                const locality = localityMap[location.fk_id_locality] || { name: 'Desconocido', fk_id_district: null };
                const district = districtMap[locality.fk_id_district] || { name: 'Desconocido', fk_id_province: null };
                const province = provinceMap[district.fk_id_province] || { name: 'Desconocido', fk_id_region: null };
                const region = regionMap[province.fk_id_region] || { name: 'Desconocido' };
                return {
                    id: stop.id,
                    name: stop.name,
                    phone: stop.phone || '',
                    companyName: companyMap[stop.fk_id_company] || 'Desconocido',
                    location: `${location.reference}, ${locality.name}, ${district.name}, ${province.name}, ${region.name}`
                };
            });
        } catch (error) {
            throw new Error(`Failed to get stops: ${error.message}`);
        }
    }

    /**
     * Crea un nuevo paradero con validaciones.
     * @param {Object} data - Datos del paradero (name, phone, fk_id_company, fk_id_location).
     * @returns {Promise<Object>} Paradero creado para la UI.
     */
    async createStop(data) {
        try {
            if (!data.name || typeof data.name !== 'string') {
                throw new Error('Name is required');
            }
            if (!data.phone || typeof data.phone !== 'string') {
                throw new Error('Phone is required');
            }
            if (!data.fk_id_company || typeof data.fk_id_company !== 'string') {
                throw new Error('Company ID is required');
            }
            if (!data.fk_id_location || typeof data.fk_id_location !== 'string') {
                throw new Error('Location ID is required');
            }

            const created = await this.#repository.createStop(data);
            const companies = await this.#repository.getCompanies();
            const locations = await this.#repository.getLocations();
            const localities = await this.#repository.getLocalities();
            const districts = await this.#repository.getDistricts();
            const provinces = await this.#repository.getProvinces();
            const regions = await this.#repository.getRegions();

            const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
            const locationMap = Object.fromEntries(locations.map(l => [l.id, l]));
            const localityMap = Object.fromEntries(localities.map(l => [l.id, l]));
            const districtMap = Object.fromEntries(districts.map(d => [d.id, d]));
            const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p]));
            const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

            const location = locationMap[created.fk_id_location] || { reference: 'Desconocido', fk_id_locality: null };
            const locality = localityMap[location.fk_id_locality] || { name: 'Desconocido', fk_id_district: null };
            const district = districtMap[locality.fk_id_district] || { name: 'Desconocido', fk_id_province: null };
            const province = provinceMap[district.fk_id_province] || { name: 'Desconocido', fk_id_region: null };
            const region = regionMap[province.fk_id_region] || { name: 'Desconocido' };

            return {
                id: created.id,
                name: created.name,
                phone: created.phone || '',
                companyName: companyMap[created.fk_id_company] || 'Desconocido',
                location: `${location.reference}, ${locality.name}, ${district.name}, ${province.name}, ${region.name}`
            };
        } catch (error) {
            throw new Error(`Failed to create stop: ${error.message}`);
        }
    }

    /**
     * Obtiene empresas formateadas para dropdowns.
     * @returns {Promise<Object[]>} Lista de opciones para UI.
     */
    async getCompanies() {
        try {
            const companies = await this.#repository.getCompanies();
            return companies.map(c => ({ label: c.name, value: c.id }));
        } catch (error) {
            throw new Error(`Failed to get companies: ${error.message}`);
        }
    }

    /**
     * Obtiene ubicaciones formateadas para dropdowns.
     * @returns {Promise<Object[]>} Lista de opciones para UI.
     */
    async getLocations() {
        try {
            const locations = await this.#repository.getLocations();
            return locations.map(l => ({ label: l.reference, value: l.id }));
        } catch (error) {
            throw new Error(`Failed to get locations: ${error.message}`);
        }
    }
}