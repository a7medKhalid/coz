const CONSTANTS = {
    BASE_URL: "http://127.0.0.1:8000",
};
describe("auth", () => {
    beforeEach(() => {
        beforeEach(() => {
            cy.refreshDatabase();
        });
        cy.visit(CONSTANTS.BASE_URL + "/register");
    });
    describe("register", () => {
        it("should fail to register a new user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("differnetPassword");
            cy.get("form").submit();
            cy.location("pathname").should("eq", "/register");
        });
        it("should register a new user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("password");
            cy.get("form").submit();
            cy.location("pathname").should("eq", "/");
        });
        it("should fail to register existing user", () => {
            cy.get("#name").type("testing user");
            cy.get("#email").type("test@email.com");
            cy.get("#password").type("password");
            cy.get("#password_confirmation").type("differnetPassword");
            cy.get("form").submit();
            cy.location("pathname").should("eq", "/register");
        });
    });
});
