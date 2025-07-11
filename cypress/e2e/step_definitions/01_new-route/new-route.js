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

When('selecciona los paraderos inicio y final', () => {
    cy.get('.p-button-icon-left').click();
    cy.wait(500);
    cy.get('#stop_a').click();
    cy.wait(500);
    cy.get('body').contains('Puente alto',{timeout:10000}).should('be.visible').click({force: true});

    cy.get('#stop_b').click();
    cy.wait(500);
    cy.get('body').contains('La Esquina').click({force: true});
});

When('asigna la duración de la ruta, el precio y la frecuencia de salida', () => {
    cy.get('input.p-inputnumber-input[role="spinbutton"]').eq(0)
        .click()
        .clear()
        .type('30');
    cy.get('input.p-inputnumber-input[role="spinbutton"]')
        .eq(1)
        .click()
        .clear()
        .type('5');
    cy.get('input.p-inputnumber-input[role="spinbutton"]')
        .eq(2)
        .click()
        .clear()
        .type('25');
});

When('Se dará click al boton de continuar', () => {
    cy.get('.create-button > .p-button-label').click().click();

});

Then('la ruta debería crearse correctamente', () => {
    cy.get('.btn-continue')
        .should('be.enabled')
        .click();
});


