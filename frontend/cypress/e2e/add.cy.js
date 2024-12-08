import { loginUser, randomString } from "./login.cy"
import { ALERT_TEXT } from "../../src/components/Add"

const randomEmail = () => `${randomString()}@${randomString()}.com`;

describe('Add member', () => {
  beforeEach(() => {
    loginUser()
    cy.get('#add-member-button').click()
    cy.get('#add-team-member-header').should('be.visible');
  })
  it('successfully adds a new member', () => {
    const first = randomString();
    const last = randomString();
    const email = randomEmail();
    const phone = randomString();
    cy.get('#first-name-input').type(first);
    cy.get('#last-name-input').type(last);
    cy.get('#email-input').type(email);
    cy.get('#phone-input').type(phone);
    cy.get('#not-admin').click();
    cy.get('#submit-add-team-member-button').click()
    cy.get('.member-email').last().should('have.text', email);
  });
  it('successfully adds a new admin', () => {
    const first = randomString();
    const last = randomString();
    const email = randomEmail();
    const phone = randomString();
    const expectedString = `${first} (admin)`;
    cy.get('#first-name-input').type(first);
    cy.get('#last-name-input').type(last);
    cy.get('#email-input').type(email);
    cy.get('#phone-input').type(phone);
    cy.get('#admin').click();
    cy.get('#submit-add-team-member-button').click()
    cy.get('.member-first-name')
      .last().should('have.text', expectedString);
  });
  it('alerts if not all fields are completed', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('#submit-add-team-member-button').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith(ALERT_TEXT);
    });
  })
})