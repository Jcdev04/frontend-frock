import { BaseService } from '@/shared/services/base-service.js';
import { Locality } from '../models/locality.entity.js';

export class LocalityService extends BaseService {
    constructor() {
        super('geographic/localities');
    }

    async getByDistrict(districtId) {
        const data = await this.http.get(`${this.resourcePath()}?fk_id_district=${districtId}`);
        return data.map(item => new Locality(item));
    }
}