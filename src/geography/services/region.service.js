import { BaseService } from '@/shared/services/base-service.js';
import { Region } from '../models/region.entity.js';

export class RegionService extends BaseService {
    constructor() {
        super('/regions');
    }

    async getAll() {
        const data = await super.getAll();
        return data.map(item => new Region(item));
    }
}