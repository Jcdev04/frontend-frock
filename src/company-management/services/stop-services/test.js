//esto es para testear que funcionen los servicios nada mas
//sale en la consola :V

import { StopService } from '../stop-services/stop.service.js';

const service = new StopService();

async function testGetStops() {
    console.log('Probando getStops...');
    try {
        const stops = await service.getStops();
        console.log('Paraderos obtenidos:', stops);
        stops.forEach(stop => {
            console.log(`- ${stop.name}: ${stop.companyName}, ${stop.location}`);
        });
    } catch (error) {
        console.error('Error en getStops:', error.message);
    }
}

async function testCreateStop() {
    console.log('\nProbando createStop...');
    const newStop = {
        id: `stop-${Date.now()}`, // ID único
        name: 'Paradero Test',
        phone: '+56998765432',
        fk_id_company: 'comp-1', // Asegúrate de que exista en /companies
        fk_id_location: 'locat-1' // Asegúrate de que exista en /locations
    };
    try {
        const created = await service.createStop(newStop);
        console.log('Paradero creado:', created);
        console.log(`- ${created.name}: ${created.companyName}, ${created.location}`);
    } catch (error) {
        console.error('Error en createStop:', error.message);
    }
}

async function testGetCompanies() {
    console.log('\nProbando getCompanies...');
    try {
        const companies = await service.getCompanies();
        console.log('Empresas obtenidas:', companies);
        companies.forEach(c => console.log(`- ${c.label} (${c.value})`));
    } catch (error) {
        console.error('Error en getCompanies:', error.message);
    }
}

async function testGetLocations() {
    console.log('\nProbando getLocations...');
    try {
        const locations = await service.getLocations();
        console.log('Ubicaciones obtenidas:', locations);
        locations.forEach(l => console.log(`- ${l.label} (${l.value})`));
    } catch (error) {
        console.error('Error en getLocations:', error.message);
    }
}

async function runTests() {
    await testGetStops();
    //await testCreateStop();
    //await testGetCompanies();
    //await testGetLocations();
}

runTests();