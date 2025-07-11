import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario inicia sesión con correo {string} y contraseña {string}', (correo, clave) => {
    cy.visit('https://frock-front-end.vercel.app/auth/login');
    cy.get('#email').click().type(correo);
    cy.get('#password').click().type(clave);
    cy.get('.btn-login').click();
});

When('accede a la sección de paraderos', () => {
    cy.contains('Paraderos').click();
});

When('hace clic en el botón "Nuevo Paradero"', () => {
    cy.get('.nuevo-paradero-button > .p-button-label').click();
});

When('completa el formulario de paradero con datos válidos', () => {
    cy.get('#name').click().type('Puente Bajo');
    cy.get('#phone').click().type('987654321');
    cy.get('#address').click().type('Av. San Judas Tadeo 861');
    cy.get('#reference').click().type('Al costado de la polleria Pardos Chicken');
});

When('selecciona la región, provincia y distrito', () => {
    cy.contains('label', 'Región').parent().find('.p-select-dropdown').click();
    cy.get('body').contains('AREQUIPA').click();

    cy.contains('label', 'Provincia').parent().find('.p-select-dropdown').click();
    cy.get('body').contains('CAMANA').click();

    cy.contains('label', 'Distrito').parent().find('.p-select-dropdown').click();
    cy.get('body').contains('OCOÑA').click();
});


When('envía el formulario', () => {
    cy.get('.create-button').click();
});

Then('debería ver el nuevo paradero creado correctamente', () => {
});
