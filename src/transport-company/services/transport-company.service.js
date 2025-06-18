import { BaseService } from '@/shared/services/base-service.js';
import { TransportCompanyAssembler } from './transport-company.assembler';
import { TransportCompany } from '../models/transport-company.entity';

export class TransportCompanyService extends BaseService {
    /**
     * @param {Object} options
     * @param {Object} httpClient
     */
    constructor( options = {}, httpClient) {
        super( '/companies', options, httpClient);
    }

    /**
     * Creates a transport company
     * @param {Object} company
     * @returns {Promise<TransportCompany>}
     */
    async createTransportCompany(company) {
        if (!(company instanceof TransportCompany)) {
            throw new Error('Invalid TransportCompany instance');
        }

        try {
            const response = await super.create(
                TransportCompanyAssembler.fromEntityToResponse(company)
            );
            return TransportCompanyAssembler.fromResponseToEntity(response);
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
    async updateTransportCompany(id, company) {
        if (!(company instanceof TransportCompany)) {
            throw new Error('Invalid TransportCompany instance');
        }
        try {
            const response = await super.update(
                id,
                TransportCompanyAssembler.fromEntityToResponse(company)
            );
            return TransportCompanyAssembler.fromResponseToEntity(response);
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
    async getTransportCompanyById(id) {
        try {
            const response = await super.getById(id);
            return TransportCompanyAssembler.fromResponseToEntity(response);
        } catch (error) {
            console.error('Get by ID failed:', error);
            throw error;
        }
    }
}