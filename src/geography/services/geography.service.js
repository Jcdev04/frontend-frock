import { RegionService } from './region.service.js';
import { ProvinceService } from './province.service.js';
import { DistrictService } from './district.service.js';
import { LocalityService } from './locality.service.js';

export class GeographyService {
    constructor() {
        this.regionService = new RegionService();
        this.provinceService = new ProvinceService();
        this.districtService = new DistrictService();
        this.localityService = new LocalityService();
    }

    async getFullHierarchy() {
        try {
            const [regions, provinces, districts, localities] = await Promise.all([
                this.regionService.getAll(),
                this.provinceService.getAll(),
                this.districtService.getAll(),
                this.localityService.getAll()
            ]);

            return regions.map(region => ({
                ...region.toSelectOption(),
                provinces: provinces
                    .filter(province => province.regionId === region.id)
                    .map(province => ({
                        ...province.toSelectOption(),
                        districts: districts
                            .filter(district => district.provinceId === province.id)
                            .map(district => ({
                                ...district.toSelectOption(),
                                localities: localities
                                    .filter(locality => locality.districtId === district.id)
                                    .map(locality => locality.toSelectOption())
                            }))
                    }))
            }));
        } catch (error) {
            console.error('Error loading location hierarchy:', error);
            throw new Error('Failed to load location hierarchy');
        }
    }
}