import {RouteService} from "@/network/services/route.service.js";
import {ScheduleService} from "@/network/services/schedule.service.js";
import {CreateRouteDto} from "@/network/models/DTO/CreateRouteDto.js";
import {RouteStopsService} from "@/network/services/route-stops-service.js";
import {CreateRouteStopsDto} from "@/network/models/DTO/CreateRouteStopsDto.js";
import {CreateScheduleDto} from "@/network/models/DTO/CreateScheduleDto.js";
import {StopService} from "@/network/services/stop.service.js";

export class RouteAppService{
    constructor() {
        this.routeService = new RouteService();
        this.routeStopsService = new RouteStopsService();
        this.scheduleService = new ScheduleService();
        this.stopService = new StopService()
    }

    async createFullRoute(routeInfo, scheduleData){
        const createRouteDto = new CreateRouteDto(routeInfo.duration, routeInfo.price ,routeInfo.frequency);
        const createdRoute = await this.routeService.create(createRouteDto);

        await this.routeStopsService.create( new CreateRouteStopsDto(createdRoute.id, routeInfo.selectedFirstStop));
        await this.routeStopsService.create( new CreateRouteStopsDto(createdRoute.id, routeInfo.selectedSecondStop));

        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Lunes", scheduleData.monday.startTime, scheduleData.monday.endTime, scheduleData.monday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Martes", scheduleData.tuesday.startTime, scheduleData.tuesday.endTime, scheduleData.tuesday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Miércoles", scheduleData.wednesday.startTime, scheduleData.wednesday.endTime, scheduleData.wednesday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Jueves", scheduleData.thursday.startTime, scheduleData.thursday.endTime, scheduleData.thursday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Viernes", scheduleData.friday.startTime, scheduleData.friday.endTime, scheduleData.friday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Sábado", scheduleData.saturday.startTime, scheduleData.saturday.endTime, scheduleData.saturday.enabled))
        await this.scheduleService.create(new CreateScheduleDto(createdRoute.id, "Domingo", scheduleData.sunday.startTime, scheduleData.sunday.endTime, scheduleData.sunday.enabled))
    }
    async loadRoutesByCompany(companyId) {
        // 1️⃣  Carga todos los paraderos de esta compañía
        const stopsRaw = await this.stopService.getStopsByCompanyId(companyId);
        // stopsRaw: [{ id, name, google_maps_url, image_url, phone, fk_id_company, fk_id_locality, address, reference }, …]

        // 2️⃣  Mapea a un objeto fácil de buscar
        const stopsMap = Object.fromEntries(
            stopsRaw.map(s => [s.id, s])
        );
        const stopIds = Object.keys(stopsMap);

        // 3️⃣  Recupera todas las asociaciones route–stop y filtra por estos stops
        const allRouteStops = await this.routeStopsService.getAll();
        const filteredRouteStops = allRouteStops.filter(rs =>
            stopIds.includes(rs.fk_id_stop)
        );

        // 4️⃣  Agrupa los stop_ids por cada route_id
        const routeStopsMap = filteredRouteStops.reduce((acc, {fk_id_route, fk_id_stop}) => {
            acc[fk_id_route] = acc[fk_id_route] || [];
            acc[fk_id_route].push(fk_id_stop);
            return acc;
        }, {});

        // 5️⃣  Carga las rutas cuyos IDs salieron en el paso anterior
        const allRoutes = await this.routeService.getAll();
        const relevantRoutes = allRoutes.filter(r =>
            routeStopsMap[r.id] && routeStopsMap[r.id].length === 2
        );

        // 6️⃣  Construye el array final
        return relevantRoutes.map(route => {
            const [startId, endId] = routeStopsMap[route.id];
            const start = stopsMap[startId];
            const end = stopsMap[endId];
            return {
                stopStart: {
                    name: start.name,
                    image_url: start.image_url,
                    address: start.address
                },
                stopEnd: {
                    name: end.name,
                    image_url: end.image_url,
                    address: end.address
                },
                id: route.id,
                price: route.tarifa,
                frequency: route.frecuencia,
                duration: route.duracion
            };
        });
    }
    async deleteRoute(idRoute){
        await this.routeService.delete(idRoute);

    }
}