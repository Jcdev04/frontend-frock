import { BaseService } from '@/shared/services/base-service.js';
import { Locality } from '../models/locality.entity.js';

export class LocalityService extends BaseService {
    constructor() {
        super('/localities');
    }

    async getByDistrict(districtId) {
        const data = await this.http.get(`${this.resourcePath()}?districtId=${districtId}`);
        return data.map(item => new Locality(item));
    }
}