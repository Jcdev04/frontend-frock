import { BaseService } from '@/shared/services/base-service.js';
import { District } from '../models/district.entity.js';

export class DistrictService extends BaseService {
    constructor() {
        super('/districts');
    }

    async getByProvince(provinceId) {
        const data = await this.http.get(`${this.resourcePath()}?provinceId=${provinceId}`);
        return data.map(item => new District(item));
    }
}