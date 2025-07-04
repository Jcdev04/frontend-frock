import { BaseService } from '@/shared/services/base-service.js';

export class RouteAlphaService extends BaseService {
    constructor() {
        super('routes');
    }



    // No es necesario definir getAll() aquí, ya que se hereda de BaseService.
}

// Exportamos una única instancia (singleton) para ser usada en la aplicación.
export const routeAlphaService = new RouteAlphaService();
