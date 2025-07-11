import { BaseService } from '@/shared/services/base-service.js';
import { Province } from '../models/province.entity.js';

export class ProvinceService extends BaseService {
    constructor() {
        super('geographic/provinces');
    }

    async getByRegion(regionId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/region/${regionId}`);

            return response.data;
        }
        catch (error) {
            console.error('Error fetching provinces by region:', error);
            throw new Error('Failed to fetch provinces by region');
        }
    }
}