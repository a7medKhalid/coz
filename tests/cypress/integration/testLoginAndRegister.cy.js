describe("auth", () => {
    beforeEach(() => {
        cy.refreshDatabase();
        cy.visit("/register");
    });
    describe("register", () => {
        it("should fail to register a new user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("differnetPassword");
            cy.get("form").submit();
            cy.contains("Whoops!");
        });
        it("should register a new user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("password");
            cy.get("form").submit();
            cy.assertRedirect("/");
        });
        it("should fail to register existing user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("differnetPassword");
            cy.get("form").submit();
            cy.contains("Whoops!");
        });
    });
});
