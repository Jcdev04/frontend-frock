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

    /**
     * Fetch the non-directed graph links: start stop, route info, end stop
     * @returns {Promise<Array<{start: object, route: object, end: object}>>}
     */
    async getRouteLinks() {
        // 1. Disparar las tres llamadas en paralelo
        const [srRes, stopsRes, routesRes] = await Promise.all([
            http.get("/stops_routes"),
            http.get("/stops"),
            http.get("/routes")
        ]);

        const stopsRoutes = srRes.data;
        const stops      = Object.fromEntries(stopsRes.data.map(s => [s.id, s]));
        const routes     = Object.fromEntries(routesRes.data.map(r => [r.id, r]));

        // 2. Agrupar los stops_routes por ruta
        const grouped = stopsRoutes.reduce((acc, rel) => {
            acc[rel.fk_id_route] = acc[rel.fk_id_route] || [];
            acc[rel.fk_id_route].push(rel.fk_id_stop);
            return acc;
        }, {});

        // 3. Construir el array final [{ start, route, end }, …]
        return Object.entries(grouped).map(([routeId, stopIds]) => {
            const [startId, endId] = stopIds;
            return {
                start:  stops[startId],
                route:  routes[routeId],
                end:    stops[endId]
            };
        });
    }
}
