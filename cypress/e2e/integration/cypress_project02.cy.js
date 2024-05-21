/// <reference types="cypress" />

describe("Project 02", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-2");
    });
    
    it("Validate the Login Form", () => {
      // Task 2
      cy.get('#username').should('be.visible')
      // Task 3
      cy.get('#username').should('not.have.attr', 'required')
      // Task 4
      cy.contains('label', 'Please enter your username')
      // Task 5
      cy.get('#password').should('be.visible')
      // Task 6
      cy.get('#password').should('not.have.attr', 'required')
      // Task 7
      cy.contains('label', 'Please enter your password')
      // Task 8
      cy.get('#login_btn').should('be.visible')
      // Task 9
      cy.get('#login_btn').click()
      // Task 10
      cy.get('#login_btn').contains('LOGIN')
      // TASK 11
      cy.get('a[href="/frontend/project-2"]')
      // Task 12
      cy.contains('a[href="/frontend/project-2"]', "Forgot Password?").click()
      // Task 13
      cy.contains('a[href="/frontend/project-2"]', 'Forgot Password?')

      it("Test Case 02 - Validate the valid login", () => {
        // Task 2
        cy.get("#username").type("TechGlobal");
        // Task 3
        cy.get("#password").type("Test1234");
        // Task 4
        cy.get("#login_btn").click();
        // Task 5
        cy.get("#success_lgn")
          .should("have.text", "You are logged in")
          .and("be.visible");
          // Task 6
        cy.get("#logout").should("be.visible");
      });
    
      it("Test Case 03 - Validate the logout", () => {
        //Task 2
        cy.get("#username").type("TechGlobal");
        // Task 3
        cy.get("#password").type("Test1234");
        // Task 4
        cy.get("#login_btn").click();
        // Task 5
        cy.get("#logout").click();
        // Task 6
        cy.get(".LoginForm_form__m12Jc").should("be.visible");
      });
    
      it("Test Case 04 - Validate the Forgot Password? Link and Reset Password modal", () => {
       // Task 2
        cy.get("button + a").click();
      // Task 3
        cy.get("#modal_title").should("have.text", "Reset Password");
        // Task 4
        cy.get(".delete").should("be.visible");
        // Task 5
        cy.get("#email").should("be.visible");
        // Task 6
        cy.get("[for=email]").should(
          "have.text",
          "Enter your email address and we'll send you a link to reset your password. "
        );
        // Task 7, 8, 9
        cy.get("#submit")
          .should("be.visible")
          .and("be.enabled")
          .and("have.text", "SUBMIT");
      });
    
      it("Test Case 05 - Validate the Reset Password modal close button", () => {
        // Task 2
        cy.get("button + a").click();
        // Task 3
        cy.get(".modal-card").should("be.visible");
        // Task 4
        cy.get(".delete").click();
        // Task 5
        cy.get(".modal-card").should("not.exist");
      });
    
      it("Test Case 06 - Validate the Reset Password form submission", () => {
        // Task 2
        cy.get("button + a").click();
        // Task 3
        cy.get("#email").type("mustafa@gmail.com");
        // Task 4
        cy.get("#submit").click();
        // Task 5
        cy.get("#confirmation_message").should("be.visible");
      });
    
      it("Test Case 07 - Validate the invalid login with the empty credentials", () => {
        // Task 2
        cy.get("#login_btn").click();
        // Task 3 4 5
        cy.get("#error_message")
          .should("be.visible")
          .and("have.text", "Invalid Username entered!");
      });
    
      it("Test Case 08 - Validate the invalid login with the wrong username", () => {
        // Task 2
        cy.get("#username").type("John");
        // Task 3
        cy.get("#password").type("Test1234");
        // Task 4
        cy.get("#login_btn").click();
        // Task 5
        cy.get("#error_message")
          .should("be.visible")
          .and("have.text", "Invalid Username entered!");
      });
      it("Test Case 10 - Validate the invalid login with the wrong username and password", () => {
        // Task 2
        cy.get("#username").type("John");
        // Task 3
        cy.get("#password").type("1234");
        // Task 4, 5
        cy.get("#login_btn").click();
        cy.get("#error_message")
          .should("be.visible")
          .and("have.text", "Invalid Username entered!");
      });
    });
})