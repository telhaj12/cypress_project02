/// <reference types="Cypress"/>

describe("Project2", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-2");
  });

  it("Test Case 01 - Validate the login form", () => {
    cy.get("#username").should("be.visible").and("not.have.attr", "required");
    cy.get('[for="username"]').should(
      "have.text",
      "Please enter your username"
    );
    cy.get("#password").should("be.visible").and("not.have.attr", "required");
    cy.get('[for="password"]').should(
      "have.text",
      "Please enter your password"
    );
    cy.get("#login_btn")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "LOGIN");
    cy.get("button + a")
      .should("be.visible")
      .and("have.text", "Forgot Password?")
      .click();
    cy.get(".modal-card").should("be.visible");
  });

  it("Test Case 02 - Validate the valid login", () => {
    cy.get("#username").type("TechGlobal");
    cy.get("#password").type("Test1234");
    cy.get("#login_btn").click();
    cy.get("#success_lgn")
      .should("have.text", "You are logged in")
      .and("be.visible");
    cy.get("#logout").should("be.visible");
  });

  it("Test Case 03 - Validate the logout", () => {
    cy.get("#username").type("TechGlobal");
    cy.get("#password").type("Test1234");
    cy.get("#login_btn").click();
    cy.get("#logout").click();
    cy.get(".LoginForm_form__m12Jc").should("be.visible");
  });

  it("Test Case 04 - Validate the Forgot Password? Link and Reset Password modal", () => {
    cy.get("button + a").click();
    cy.get("#modal_title").should("have.text", "Reset Password");
    cy.get(".delete").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("[for=email]").should(
      "have.text",
      "Enter your email address and we'll send you a link to reset your password. "
    );
    cy.get("#submit")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "SUBMIT");
  });

  it("Test Case 05 - Validate the Reset Password modal close button", () => {
    cy.get("button + a").click();
    cy.get(".modal-card").should("be.visible");
    cy.get(".delete").click();
    cy.get(".modal-card").should("not.exist");
  });

  it("Test Case 06 - Validate the Reset Password form submission", () => {
    cy.get("button + a").click();
    cy.get("#email").type("mustafa@gmail.com");
    cy.get("#submit").click();
    cy.get("#confirmation_message").should("be.visible");
  });

  it("Test Case 07 - Validate the invalid login with empty credentials", () => {
    cy.get("#login_btn").click();
    cy.get("#error_message").should("have.text", "Invalid Username entered!");
  });

  const loginInfo = (username, password) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#login_btn").click();
  };

  const info = [
    {
      case: "Validate the invalid login with the wrong username",
      username: "John",
      password: "Test1234",
      result: "Invalid Username entered!",
    },
    {
      case: "Validate the invalid login with the wrong password",
      username: "TechGlobal",
      password: "1234",
      result: "Invalid Password entered!",
    },
    {
      case: "Validate the invalid login with the wrong username and password",
      username: "John",
      password: "1234",
      result: "Invalid Username entered!",
    },
  ];
  info.forEach((el, index) => {
    it(`Test Case ${index === 2 ? "" : 0}${index + 8} - ${el.case}`, () => {
      loginInfo(el.username, el.password);
      cy.get("#error_message").should("have.text", `${el.result}`);
    });
  });
});