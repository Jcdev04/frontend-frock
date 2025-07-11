import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario está en la página de registro', () => {
    cy.visit('https://frock-front-end.vercel.app/auth/register');
});

When('completa todos los campos requeridos con datos válidos', () => {
    cy.get('.form-group:nth-child(1) > input').type('Jesus');         // Nombres
    cy.get('.form-group:nth-child(2) > input').type('Castillo');      // Apellidos
    const uniqueEmail = `testuser_${Date.now()}@mail.com`
    cy.get('input[placeholder="Correo electrónico"]').type(uniqueEmail)
    cy.get('.form-group:nth-child(4) > input').type('123');           // Contraseña (puedes cambiar por una más segura)
});

When('selecciona el rol {string}', (rol) => {
    cy.get('select').select(rol);
});

When('hace clic en el botón de registro', () => {
    cy.get('.btn-submit').should('not.be.disabled').click();
});

Then('debería ver un mensaje de bienvenida', () => {
    cy.contains('Registro exitoso 🎉').should('exist'); // Ajusta según el mensaje real de tu app
});
