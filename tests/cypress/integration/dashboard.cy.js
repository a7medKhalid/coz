describe("as admin ", () => {
    beforeEach(() => {
        cy.artisan("migrate:fresh --seed");
        cy.login({ email: "admin@test.com" });
        cy.visit("/dashboard");
        it("should load dashboard", () => {
            cy.contains("لوحة تحكم كوز");
        });
    });
    describe("dashboard routes", () => {
        it("should get all admin routes", () => {
            cy.contains("ادارة الفروع");
            cy.contains("ادارة الموظفين");
            cy.contains("الرئيسية");
        });
    });
    describe("add branch", () => {
        it("should add a branch", () => {
            cy.get(
                ":nth-child(1) > .MuiListItemButton-root > .MuiListItemText-root > .MuiTypography-root"
            ).click();
            cy.get("#name").type("فرع البساتين");
            cy.get("#customgooglemap").click();
            cy.get("#addBranchButton").click();
            cy.contains("تم إضافة الفرع بنجاح");
        });
    });
});
