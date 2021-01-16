/// <reference types="cypress" />

describe('Ongs', () => {
    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('[data-cy=name]').type('Dogs queridos');
        cy.get('[data-cy=email]').type('dogs@email.com');
        cy.get('[data-cy=whatsapp]').type('1199999999');
        cy.get('[data-cy=city]').type('BH');
        cy.get('[data-cy=uf]').type('MG');

        cy.server();
        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then(xhr => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('deve poder realizar login no sistema', () => {
        const createdOngId = Cypress.env('createdOngId');

        cy.visit('http://localhost:3000');
        cy.get('input').type(createdOngId);
        cy.get('.button').click();
    });
})