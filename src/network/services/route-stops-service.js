import {BaseService} from "@/shared/services/base-service.js";

export class RouteStopsService extends BaseService{
    constructor() {
        super("/route_stops");
    }
}