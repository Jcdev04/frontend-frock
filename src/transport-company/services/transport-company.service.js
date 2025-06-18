import { BaseService } from '@/shared/services/base-service.js';
import { TransportCompanyAssembler } from './transport-company.assembler';
import { TransportCompany } from '../models/transport-company.entity';

export class TransportCompanyService extends BaseService {
    /**
     * @param {string} baseUrl
     * @param {Object} options
     * @param {Object} httpClient
     */
    constructor(baseUrl, options = {}, httpClient) {
        super(baseUrl, '/companies', options, httpClient);
    }

    /**
     * Creates a transport company
     * @param {Object} company
     * @returns {Promise<TransportCompany>}
     */
    async create(company) {
        if (!(company instanceof TransportCompany)) {
            throw new Error('Invalid TransportCompany instance');
        }

        try {
            const response = await super.create(
                TransportCompanyAssembler.fromEntitytoResponse(company)
            );
            return TransportCompanyAssembler.fromResponsetoEntity(response);
        } catch (error) {
            console.error('Create failed:', error);
            throw error;
        }
    }

    /**
     * Updates a transport company
     * @param {string} id
     * @param {Object} company
     * @returns {Promise<TransportCompany>}
     */
    async update(id, company) {
        if (!(company instanceof TransportCompany)) {
            throw new Error('Invalid TransportCompany instance');
        }
        try {
            const response = await super.update(
                id,
                TransportCompanyAssembler.fromEntitytoResponse(company)
            );
            return TransportCompanyAssembler.fromResponsetoEntity(response);
        } catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    }

    /**
     * Gets company by ID
     * @param {string} id
     * @returns {Promise<TransportCompany>}
     */
    async getById(id) {
        try {
            const response = await super.getById(id);
            return TransportCompanyAssembler.fromResponsetoEntity(response);
        } catch (error) {
            console.error('Get by ID failed:', error);
            throw error;
        }
    }
}