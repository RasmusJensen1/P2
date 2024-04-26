const app = require("../app");
const request = require("supertest");
const Budget = require("../models/budget.model");
const User = require("../models/user.model");

describe("Testing POST request for create budget", () => {

    test("Is not authenticated, should respond with status code 401", async () => {
            const response = await request(app)
            .post("/create-budget")
            .send({ budgetName: "Gamer", budgetType: "Basic", budgetFile: undefined});
    
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
    });

    test("Is authenticated, should respond with status code 200, and text Budget saved succesfully", async () => {

        const user = await User.findOne({ username: 'testuser', password: 'testpassword' });
        const userCookie = btoa(JSON.stringify({ id: user._id, name: user.username })); 

        const newBudget = {
            budgetName: "Test",
            budgetType: "Basic",
            budgetFile: undefined
        }

        const response = await request(app)
        .post("/create-budget")
        .set('Cookie', `user_cookie=${userCookie}`)
        .send(newBudget);

        expect(response.statusCode).toBe(200);
        expect(response.headers['location']).toBe("/my-budgets");

        const budget = await Budget.findOne({ name: newBudget.budgetName, userId: user._id }); 
        expect(budget).not.toBeNull();
    });

});