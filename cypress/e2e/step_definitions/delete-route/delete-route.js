import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario ha iniciado sesión con correo {string} y contraseña {string}', (correo, password) => {
    cy.visit('https://frock-front-end.vercel.app/auth/login');
    cy.get('#email').type(correo);
    cy.get('#password').type(password);
    cy.get('.btn-login').click();
});

When('accede a la sección de rutas', () => {
    cy.contains('Rutas').click();
});

When('hace clic en el icono de eliminar de la ruta', () => {
    cy.get('.pi-trash').first().click({ force: true });
});

When('confirma la eliminación', () => {
    cy.get('.p-confirmdialog-accept-button > .p-button-label').click();
});

Then('la ruta debería desaparecer de la lista', () => {
    cy.get('.pi-trash').should('have.length.lessThan', 1);
});
