import { BaseService } from '@/shared/services/base-service.js';

export class TransportCompanyService extends BaseService {
    constructor() {
        super('companies');
    };

    async getCompanyByFkUserId(userId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/user/${userId}`);


            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    async createCompany(company) {
        try {
            const response = await this.http.post(this.resourcePath(), {
                name: company.name,
                logoUrl: company.logo_url,
                fkIdUser: Number(company.fkIdUser)
            });

            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }
}