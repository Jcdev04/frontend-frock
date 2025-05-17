// File: src/services/route.service.js
import http from "../../shared/services/http-common.js";

export class RouteService {
    /**
     * Fetch all routes
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAllRoutes() {
        return http.get("/routes");
    }
}