import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario inicia sesión con correo {string} y contraseña {string}', (correo, clave) => {
    cy.visit('https://frock-front-end.vercel.app/auth/login');
    cy.viewport(1051, 806);
    cy.get('#email').click().type(correo);
    cy.get('#password').click().type(clave);
    cy.get('.btn-login').click();
});

When('hace clic en la tarjeta inferior de editar información de empresa', () => {
    cy.get('.company-details').click();
});

When('hace clic en editar', () => {
    cy.get('.card-title .p-button-label').click();
});

When('borra y escribe {string} en el campo nombre de empresa', (nombre) => {
    cy.get('#companyName')
        .click()
        .click()
        .clear()
        .type(nombre);
});

When('hace clic en el botón de guardar cambios', () => {
    cy.get('.p-button:nth-child(2) > .p-button-label:nth-child(1)').click();
});

Then('debería ver un cambio visual en la interfaz', () => {
});
