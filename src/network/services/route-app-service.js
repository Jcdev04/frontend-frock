import {RouteService} from "@/network/services/route.service.js";
import {ScheduleService} from "@/network/services/schedule.service.js";
import {CreateRouteDto} from "@/network/models/DTO/CreateRouteDto.js";
import {RouteStopsService} from "@/network/services/route-stops-service.js";
import {CreateRouteStopsDto} from "@/network/models/DTO/CreateRouteStopsDto.js";
import {CreateScheduleDto} from "@/network/models/DTO/CreateScheduleDto.js";

export class RouteAppService{
    constructor() {
        this.routeService = new RouteService();
        this.routeStopsService = new RouteStopsService();
        this.scheduleService = new ScheduleService();
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
}