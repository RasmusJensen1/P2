const app = require("../app");
const request = require("supertest");

describe("Testing POST request for create budget", () => {

    test("Is not authenticated, should respond with status code 401, and text unauthorized", async () => {
        const response = await request(app)
        .post("/create-budget")
        .send({
            budget: {
                budgetName: "Test",
                budgetType: "Test",
                budgetFile: undefined
            }});

        expect(response.statusCode).toBe(401);
        expect(response.text).toBe("Unauthorized");
    });

    test("Is authenticated, should respond with status code 200, and text Budget saved succesfully", async () => {
        const response = await request(app)
        .post("/create-budget")
        .set('Cookie', 'user_cookie=eyJpZCI6IjY2MjBiZjRkNWVmMzQyMDdjOTUwZGMzMyIsIm5hbWUiOiJ0ZXN0dGVzdHRlc3QifQ==')
        .send({
            budget: {
                budgetName: "Test",
                budgetType: "Test",
                budgetFile: undefined
            }});

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Budget created succesfully");
    });

});