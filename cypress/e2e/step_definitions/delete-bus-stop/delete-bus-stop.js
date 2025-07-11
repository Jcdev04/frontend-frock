import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario ha iniciado sesión con correo {string} y contraseña {string}', (correo, password) => {
    cy.visit('https://frock-front-end.vercel.app/auth/login');
    cy.get('#email').type(correo);
    cy.get('#password').type(password).type('{enter}');
});

When('accede a la sección de paraderos', () => {
    cy.contains('Paraderos').click();
});

When('hace clic en el ícono de eliminar del tercer paradero', () => {
    // Ajustado para eliminar usando selectores visibles en la imagen
    cy.get('.p-card:nth-child(3) .p-button:nth-child(2) > .p-button-icon').click({ force: true });
});

When('confirma la eliminación', () => {
    cy.get('.p-dialog-footer > .p-button-danger > .p-button-label').click({ force: true });
});

Then('el paradero debería eliminarse correctamente', () => {
    cy.get('.p-dialog').should('not.exist');
});
