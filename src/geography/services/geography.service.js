import {RegionService} from "@/geography/services/region.service.js";
import {ProvinceService} from "@/geography/services/province.service.js";
import {DistrictService} from "@/geography/services/district.service.js";
import {LocalityService} from "@/geography/services/locality.service.js";

export class GeographyService {
    constructor() {
        this.regionService = new RegionService();
        this.provinceService = new ProvinceService();
        this.districtService = new DistrictService();
        this.localityService = new LocalityService();
    }
    /**
     * Obtiene la jerarquía completa de ubicaciones
     * @returns {Promise<Array>} Jerarquía completa de regiones, provincias, distritos y localidades
     */
    async getFullHierarchy() {
        try {
            const [regions, provinces, districts, localities] = await Promise.all([
                this.regionService.getAll(),
                this.provinceService.getAll(),
                this.districtService.getAll(),
                this.localityService.getAll()
            ]);

            return this._buildHierarchy(regions, provinces, districts, localities);
        } catch (error) {
            console.error('Error loading location hierarchy:', error);
            throw new Error('Failed to load location hierarchy');
        }
    }

    /**
     * Obtiene los detalles completos de una localidad específica
     * @param {string} localityId - ID de la localidad
     * @returns {Promise<Object>} Objeto con detalles completos de la ubicación
     */
    async getLocationDetails(localityId) {
        if (!localityId) {
            return this._getDefaultLocation();
        }

        try {
            const locality = await this.localityService.getById(localityId);
            if (!locality) return this._getDefaultLocation();

            const district = await this.districtService.getById(locality.fk_id_district);
            if (!district) return this._getDefaultLocation();

            const province = await this.provinceService.getById(district.fk_id_province);
            if (!province) return this._getDefaultLocation();

            const region = await this.regionService.getById(province.fk_id_region);
            return {
                locality: locality?.name || 'Desconocido',
                district: district?.name || 'Desconocido',
                province: province?.name || 'Desconocido',
                region: region?.name || 'Desconocido',
                fullPath: this._buildFullPath(locality, district, province, region)
            };
        } catch (error) {
            console.error('Error getting location details:', error);
            return this._getDefaultLocation();
        }
    }

    // Métodos privados auxiliares
    _buildHierarchy(regions, provinces, districts, localities) {
        return regions.map(region => ({
            ...region,
            provinces: provinces
                .filter(province => province.fk_id_region === region.id)
                .map(province => ({
                    ...province,
                    districts: districts
                        .filter(district => district.fk_id_province === province.id)
                        .map(district => ({
                            ...district,
                            localities: localities
                                .filter(locality => locality.fk_id_district === district.id)
                                .map(locality => locality)
                        }))
                }))
        }));
    }

    _buildFullPath(locality, district, province, region) {
        const parts = [
            locality?.name,
            district?.name,
            province?.name,
            region?.name
        ].filter(Boolean);

        return parts.join(', ') || 'Ubicación desconocida';
    }

    _getDefaultLocation() {
        return {
            locality: 'Desconocido',
            district: 'Desconocido',
            province: 'Desconocido',
            region: 'Desconocido',
            fullPath: 'Ubicación desconocida'
        };
    }
}