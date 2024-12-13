import { 
  loginUser, 
  randomString, 
} from "./login.cy"
import { randomEmail } from "./add.cy";
import { NO_UPSTREAM_TEXT } from "../../src/App";
const first = randomString();
const last = randomString();
const email = randomEmail();
const phone = randomString();

describe('Delete Member', () => {
  beforeEach(() => {
    loginUser();
    cy.get('#add-member-button').click()
    cy.get('#first-name-input').type(first);
    cy.get('#last-name-input').type(last);
    cy.get('#email-input').type(email);
    cy.get('#phone-input').type(phone);
    cy.get('#not-admin').click();
    cy.get('#submit-add-team-member-button').click();
    cy.contains('.user-profile-link', first).click();
  });
  it("deletes existing member", () => {
    cy.get('#submit-delete-team-member-button').click();
    cy.contains('.user-profile-link', first).should('not.exist');
  });
  it('alerts when trying to delete a user which does not exist', () => {
    cy.intercept('DELETE', '/api/v1/member/', {statusCode: 500}).as('delete');
    cy.get('#submit-delete-team-member-button').click();
    cy.on('window:alert', e => {
      expect(e).to.equal(NO_UPSTREAM_TEXT);
    });
  })
})