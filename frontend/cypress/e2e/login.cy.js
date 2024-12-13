import { 
  LOGIN_FAILED_TEXT,
  NO_UPSTREAM_TEXT,
} from "../../src/App";

const APP_URL = 'http://localhost:3000';
const TEST_USERNAME = 'testing@instawork.com';
const TEST_PASSWORD = 'thisISaTESTpassword!';
export const randomString = () => Math.random().toString(36).slice(2);
const UNAUTHORIZED_USERNAME = randomString();
const UNAUTHORIZED_PASSWORD = randomString();

export function loginUser (username=TEST_USERNAME, password=TEST_PASSWORD) {
  cy.visit(APP_URL);
  cy.get('#username-input').type(username);
  cy.get('#password-input').type(password);
  return cy.get('#submit-login-button').click();
}

describe('Login', () => {
  it('should succeed with the test user', () => {
    loginUser(TEST_USERNAME, TEST_PASSWORD);
    cy.get('#team-members-header').should('be.visible');
  })

  it('should fail with an unauthorized user', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    loginUser(UNAUTHORIZED_USERNAME, UNAUTHORIZED_PASSWORD).then(() => {
      expect(stub.getCall(0)).to.be.calledWith(LOGIN_FAILED_TEXT);
    });
    cy.get('#team-members-header').should('not.exist');
    cy.get('#login-header').should('be.visible');
  })

  it('should fail if the API is unavailable', () => {
    const TEST_API_URL = 'http://localhost:8000/500';
    const stub = cy.stub();
    cy.on('window:before:load', win => win.API_URL = TEST_API_URL);
    cy.on('window:alert', stub);
    loginUser(UNAUTHORIZED_USERNAME, UNAUTHORIZED_PASSWORD).then(() => {
      expect(stub.getCall(0)).to.be.calledWith(NO_UPSTREAM_TEXT);
    });
    cy.get('#team-members-header').should('not.exist');
    cy.get('#login-header').should('be.visible');
  })
})