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
            console.log(`- ${stop.name}: ${stop.companyName}, ${stop.address}, ${stop.reference}, ${stop.location}`);
        });
    } catch (error) {
        console.error('Error en getStops:', error.message);
    }
}

async function testCreateStop() {
    console.log('\nProbando createStop...');
    const newStop = {
        id: `stop-${Date.now()}`,
        name: 'Paradero Test',
        phone: '+51987654321',
        address: 'Av. Test 789',
        reference: 'Frente al Teatro',
        fk_id_company: 'comp-1',
        fk_id_locality: 'loc-1'
    };
    try {
        const created = await service.createStop(newStop);
        console.log('Paradero creado:', created);
        console.log(`- ${created.name}: ${created.companyName}, ${created.address}, ${created.reference}, ${created.location}`);
        return created.id;
    } catch (error) {
        console.error('Error en createStop:', error.message);
    }
}

async function testUpdateStop(createdId) {
    console.log('\nProbando updateStop...');
    const stopId = 'stop-1749240577840';
    const originalStop = await service.getStops().then(stops => stops.find(s => s.id === stopId));
    const updatedData = {
        name: 'Paradero Actualizado',
        phone: '+51912345678',
        address: 'Av. Actualizada 101',
        reference: 'Frente al Museo'
    };
    try {
        const updated = await service.updateStop(stopId, updatedData);
        console.log('Paradero actualizado:', updated);
        console.log(`- ${updated.name}: ${updated.companyName}, ${updated.address}, ${updated.reference}, ${updated.location}`);
        const companyPreserved = originalStop.companyName === updated.companyName;
        const locationPreserved = originalStop.location === updated.location;
        console.log(`fk_id_company preservado: ${companyPreserved}`);
        console.log(`fk_id_locality preservado: ${locationPreserved}`);
    } catch (error) {
        console.error('Error en updateStop:', error.message);
    }
}

async function testDeleteStop() {
    console.log('\nProbando deleteStop...');
    const stopId = 'stop-1749240577840'; // Asegúrate de que exista en /stops
    try {
        await service.deleteStop(stopId);
        console.log(`Paradero ${stopId} eliminado con éxito`);
    } catch (error) {
        console.error('Error en deleteStop:', error.message);
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

async function testGetLocalities() {
    console.log('\nProbando getLocalities...');
    try {
        const localities = await service.getLocalities();
        console.log('Localidades obtenidas:', localities);
        localities.forEach(l => console.log(`- ${l.label} (${l.value})`));
    } catch (error) {
        console.error('Error en getLocalities:', error.message);
    }
}

async function runTests() {
    //await testGetStops();
    //await testCreateStop();
    //await testUpdateStop();
    //await testDeleteStop();
    //await testGetCompanies();
    //await testGetLocations();
}

//runTests();