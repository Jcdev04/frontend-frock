import { BaseService } from '@/shared/services/base-service.js';
import { District } from '../models/district.entity.js';

export class DistrictService extends BaseService {
    constructor() {
        super('geographic/districts');
    }

    //el get all se incluye gracias a la herencia de BaseService

    async getByProvince(provinceId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/province/${provinceId}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching provinces by province:', error);
            throw new Error('Failed to fetch districts by province');
        }
    }
}