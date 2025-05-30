import http from '../../shared/services/http-common.js'

export const getRouteDetails = async (routeId) => {
    try {
        const routeResponse = await http.get(`/routes/${routeId}`);
        const stopsResponse = await http.get(`/stops_routes?fk_id_route=${routeId}`);
        console.log("ok")
        const stops = await Promise.all(
            stopsResponse.data.map(async (sr) => {
                const stop = await http.get(`/stops/${sr.fk_id_stop}`);
                return stop.data;
            })
        );
        console.log("ok2")

        const schedules = await Promise.all(
            stops.map(async (stop) => {
                const schedule = await http.get(`/schedules?fk_id_stop=${stop.id}`);
                return schedule.data;
            })
        );
        console.log("ok3")
        const companies = await Promise.all(
            stops.map(async (stop) => {
                const company = await http.get(`/companies/${stop.fk_id_company}`);
                return company.data;
            })
        );
        console.log("ok4")

        return { route: routeResponse.data, stops, schedules, companies };
    } catch (error) {
        console.error('Error fetching route details:', error);
        throw error;
    }
};