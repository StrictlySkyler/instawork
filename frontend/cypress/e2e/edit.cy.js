import { loginUser, randomString } from "./login.cy"

describe('Edit Member', () => {
  beforeEach(() => {
    loginUser();
  });
  it("updates a member's information", () => {
    const phone = randomString();
    cy.get('.member-first-name').first().click();
    cy.get('#edit-team-member-header').should('be.visible');
    cy.get('#phone-input').clear();
    cy.get('#phone-input').type(phone);
    cy.get('#submit-save-team-member-button').click();
    cy.go('back');
    cy.get('.member-phone').first().should('have.text', phone);
  });
  it("requires all fields to be filled out", () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('.member-first-name').first().click();
    cy.get('#edit-team-member-header').should('be.visible');
    cy.get('#phone-input').clear();
    cy.get('#submit-save-team-member-button').click()
    cy.get('#phone-input')
      .then($el => $el[0].checkValidity()).should('be.false');
  })
})