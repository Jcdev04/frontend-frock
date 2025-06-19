// dominio/entities/Schedule.js
export class Schedule {
    constructor(id, dayOfWeek, startTime, endTime, enabled = true) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;   // 0=domingo … 6=sábado
        this.startTime = startTime;   // "08:30"
        this.endTime = endTime;       // "10:00"
        this.enabled = enabled;
    }

}
