import { RouteEntity } from '../models/route.entity.js';
import {BaseService} from "@/shared/services/base-service.js";
import {StopService} from "@/network/services/stop.service.js";

export class RouteService extends BaseService{
    constructor() {
        super('/routes');
        this.stopsService = new StopService();
    }

    async getAllRoutesByCompanyId(companyId) {

    }

    async getRouteById(id) {

    }

    async createRoute(rutaData) {
    }

    async actualizarRuta(ruta) {
    }

    async eliminarRuta(id) {
    }
}