import { RouteEntity } from '../models/route.entity.js';
import {BaseService} from "@/shared/services/base-service.js";
import {StopService} from "@/network/services/stop.service.js";
import axios from "axios";

export class RouteService extends BaseService{
    constructor() {
        super('routes');
        this.stopsService = new StopService();
    }

    async createFullRoute(routeInfo, scheduleData) {
        try{
            console.log(routeInfo, scheduleData)
        }catch (error) {
            throw this._enhanceError(error);
        }
    }
    async loadRoutesByCompany(companyId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/company/${companyId}`);
            return response.data;
        }catch (error) {
            throw this._enhanceError(error);
        }
    }

    async getByRouteId(routeId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/${routeId}`);
            return response.data;
        }catch (error) {
            throw this._enhanceError(error);
        }
    }
}