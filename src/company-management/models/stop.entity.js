export class StopEntity {
    constructor(id, name, google_maps_url, image_url, phone, fk_id_company, fk_id_location) {
        //opcional verificar errores
        if (!id || typeof id !== 'string') {
            throw new Error('ID is required and must be a non-empty string');
        }
        if (!name || typeof name !== 'string') {
            throw new Error('Name is required and must be a non-empty string');
        }
        if (!fk_id_company || typeof fk_id_company !== 'string') {
            throw new Error('Company ID is required and must be a non-empty string');
        }
        if (!fk_id_location || typeof fk_id_location !== 'string') {
            throw new Error('Location ID is required and must be a non-empty string');
        }
        if (phone && typeof phone !== 'string') {
            throw new Error('Phone must be a string if provided');
        }
        //*

        this.id = id;
        this.name = name;
        this.google_maps_url = google_maps_url ?? null; // Permite null o cadena
        this.image_url = image_url ?? null; // Permite null o cadena
        this.phone = phone;
        this.fk_id_company = fk_id_company;
        this.fk_id_location = fk_id_location;
    }
}