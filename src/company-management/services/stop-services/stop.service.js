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
            const localities = await this.#repository.getLocalities();
            const districts = await this.#repository.getDistricts();
            const provinces = await this.#repository.getProvinces();
            const regions = await this.#repository.getRegions();

            const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
            const localityMap = Object.fromEntries(localities.map(l => [l.id, l]));
            const districtMap = Object.fromEntries(districts.map(d => [d.id, d]));
            const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p]));
            const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

            return stops.map(stop => {
                const locality = localityMap[stop.fk_id_locality] || { name: 'Desconocido', fk_id_district: null };
                const district = districtMap[locality.fk_id_district] || { name: 'Desconocido', fk_id_province: null };
                const province = provinceMap[district.fk_id_province] || { name: 'Desconocido', fk_id_region: null };
                const region = regionMap[province.fk_id_region] || { name: 'Desconocido' };
                return {
                    id: stop.id,
                    name: stop.name,
                    phone: stop.phone || '',
                    address: stop.address || '',
                    reference: stop.reference || '',
                    google_maps_url: stop.google_maps_url || '',
                    image_url: stop.image_url || '',
                    companyName: companyMap[stop.fk_id_company] || 'Desconocido',
                    location: `${locality.name}, ${district.name}, ${province.name}, ${region.name}`
                };
            });
        } catch (error) {
            throw new Error(`Failed to get stops: ${error.message}`);
        }
    }

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
            if (!data.fk_id_locality || typeof data.fk_id_locality !== 'string') {
                throw new Error('Locality ID is required');
            }

            const stopData = {
                id: data.id || `stop-${Date.now()}`,
                name: data.name,
                phone: data.phone,
                address: data.address,
                reference: data.reference,
                fk_id_company: data.fk_id_company,
                fk_id_locality: data.fk_id_locality
            };
            const created = await this.#repository.createStop(stopData);

            const companies = await this.#repository.getCompanies();
            const localities = await this.#repository.getLocalities();
            const districts = await this.#repository.getDistricts();
            const provinces = await this.#repository.getProvinces();
            const regions = await this.#repository.getRegions();

            const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
            const localityMap = Object.fromEntries(localities.map(l => [l.id, l]));
            const districtMap = Object.fromEntries(districts.map(d => [d.id, d]));
            const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p]));
            const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

            const locality = localityMap[created.fk_id_locality] || { name: 'Desconocido', fk_id_district: null };
            const district = districtMap[locality.fk_id_district] || { name: 'Desconocido', fk_id_province: null };
            const province = provinceMap[district.fk_id_province] || { name: 'Desconocido', fk_id_region: null };
            const region = regionMap[province.fk_id_region] || { name: 'Desconocido' };

            return {
                id: created.id,
                name: created.name,
                phone: created.phone || '',
                address: created.address || '',
                reference: created.reference || '',
                google_maps_url: created.google_maps_url || '',
                image_url: created.image_url || '',
                companyName: companyMap[created.fk_id_company] || 'Desconocido',
                location: `${locality.name}, ${district.name}, ${province.name}, ${region.name}`
            };
        } catch (error) {
            throw new Error(`Failed to create stop: ${error.message}`);
        }
    }

    async updateStop(id, data) {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('ID is required');
            }
            if (!data.name || typeof data.name !== 'string') {
                throw new Error('Name is required');
            }
            if (!data.phone || typeof data.phone !== 'string') {
                throw new Error('Phone is required');
            }

            const updated = await this.#repository.updateStop(id, {
                name: data.name,
                phone: data.phone,
                address: data.address,
                reference: data.reference
            });

            const companies = await this.#repository.getCompanies();
            const localities = await this.#repository.getLocalities();
            const districts = await this.#repository.getDistricts();
            const provinces = await this.#repository.getProvinces();
            const regions = await this.#repository.getRegions();

            const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
            const localityMap = Object.fromEntries(localities.map(l => [l.id, l]));
            const districtMap = Object.fromEntries(districts.map(d => [d.id, d]));
            const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p]));
            const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

            const locality = localityMap[updated.fk_id_locality] || { name: 'Desconocido', fk_id_district: null };
            const district = districtMap[locality.fk_id_district] || { name: 'Desconocido', fk_id_province: null };
            const province = provinceMap[district.fk_id_province] || { name: 'Desconocido', fk_id_region: null };
            const region = regionMap[province.fk_id_region] || { name: 'Desconocido' };

            return {
                id: updated.id,
                name: updated.name,
                phone: updated.phone || '',
                address: updated.address || '',
                reference: updated.reference || '',
                google_maps_url: updated.google_maps_url || '',
                image_url: updated.image_url || '',
                companyName: companyMap[updated.fk_id_company] || 'Desconocido',
                location: `${locality.name}, ${district.name}, ${province.name}, ${region.name}`
            };
        } catch (error) {
            throw new Error(`Failed to update stop: ${error.message}`);
        }
    }

    async deleteStop(id) {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('ID is required');
            }
            await this.#repository.deleteStop(id);
        } catch (error) {
            throw new Error(`Failed to delete stop: ${error.message}`);
        }
    }

    async getCompanies() {
        try {
            const companies = await this.#repository.getCompanies();
            return companies.map(c => ({ label: c.name, value: c.id }));
        } catch (error) {
            throw new Error(`Failed to get companies: ${error.message}`);
        }
    }

    async getLocalities() {
        try {
            const localities = await this.#repository.getLocalities();
            return localities.map(l => ({ label: l.name, value: l.id }));
        } catch (error) {
            throw new Error(`Failed to get localities: ${error.message}`);
        }
    }

    async getDistricts() {
        try {
            const districts = await this.#repository.getDistricts();
            return districts.map(d => ({ label: d.name, value: d.id }));
        } catch (error) {
            throw new Error(`Failed to get districts: ${error.message}`);
        }
    }

    async getProvinces() {
        try {
            const provinces = await this.#repository.getProvinces();
            return provinces.map(p => ({ label: p.name, value: p.id }));
        } catch (error) {
            throw new Error(`Failed to get provinces: ${error.message}`);
        }
    }

    async getRegions() {
        try {
            const regions = await this.#repository.getRegions();
            return regions.map(r => ({ label: r.name, value: r.id }));
        } catch (error) {
            throw new Error(`Failed to get regions: ${error.message}`);
        }
    }

    async getLocationHierarchy() {
        try {
            const regions = await this.#repository.getRegions();
            const provinces = await this.#repository.getProvinces();
            const districts = await this.#repository.getDistricts();
            const localities = await this.#repository.getLocalities();

            // Construir jerarquía
            const hierarchy = regions.map(region => ({
                name: region.name,
                code: region.id,
                provinces: provinces
                    .filter(prov => prov.fk_id_region === region.id)
                    .map(prov => ({
                        name: prov.name,
                        code: prov.id,
                        districts: districts
                            .filter(dist => dist.fk_id_province === prov.id)
                            .map(dist => ({
                                name: dist.name,
                                code: dist.id,
                                localities: localities
                                    .filter(loc => loc.fk_id_district === dist.id)
                                    .map(loc => ({
                                        name: loc.name,
                                        code: loc.id
                                    }))
                            }))
                    }))
            }));

            return hierarchy;
        } catch (error) {
            throw new Error(`Failed to load location hierarchy: ${error.message}`);
        }
    }
}