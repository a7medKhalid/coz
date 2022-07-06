describe("as admin ", () => {
    beforeEach(() => {
        cy.artisan("migrate:fresh --seed");
        cy.login({ email: "admin@test.com" });
        cy.visit({ route: "dashboard" });
        it("should load dashboard", () => {
            cy.contains("لوحة تحكم كوز");
        });
    });
    it("does all admin functionlity", () => {
        // dashbaord routes
        cy.contains("ادارة الفروع");
        cy.contains("ادارة الموظفين");
        cy.contains("الرئيسية");
        // add branch
        // cy.get("#branches").click();
        // cy.get("#name").type("فرع البساتين");
        // cy.get("#customgooglemap").click();
        // cy.get("#addBranchButton").click();
        // cy.contains("تم إضافة الفرع بنجاح");
        // send invite
        cy.get("#employees").click();
        cy.get("#sendInvite").click();
        cy.contains("ارسال دعوة");
        cy.get("#email").type("test@test.com");
        cy.get("#send").click();
        cy.contains("بنجاح");
        cy.get('[data-id="2"] > [data-field="branchName"]').dblclick();
    });
});
