export class Locality {
    constructor({ id, name, districtId }) {
        if (!id || !name || !districtId) throw new Error('Datos incompletos');
        this.id = id;
        this.name = name;
        this.districtId = districtId;
    }

    toSelectOption() {
        return { code: this.id, name: this.name };
    }
}