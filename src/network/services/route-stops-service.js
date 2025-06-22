import {BaseService} from "@/shared/services/base-service.js";

export class RouteStopsService extends BaseService{
    constructor() {
        super("/route_stops");
    }
    async getByRouteId(routeId) {
        try {
            const response = await this.http.get(
                `${this.resourcePath()}/${id}`
            );
            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }
}