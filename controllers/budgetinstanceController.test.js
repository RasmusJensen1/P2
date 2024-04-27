const app = require("../app");	
const request = require("supertest");	
const Budget = require("../models/budget.model");
const User = require("../models/user.model");

describe("Testing GET request for /budgetinstance/:id", () => {	

    let user;
    let budget;

    beforeEach(async () => {
        user = await User.findOne({ username: 'testuser', password: 'testpassword' });
        budget = await Budget.findOne({ userId: user._id.toString()});
    })

   // Test the "/budgetinstance/:id" GET route where the budget IS found	
    test("Should respond with status code 200, when budget IS found", async () => {	
        const response = await request(app).get(`/budgetinstance/${budget._id.toString()}`);	
        expect(response.statusCode).toBe(200);	
    }); 	

    // // Test the "/budgetinstance/:id" GET route where the budget is not found	
    test("Should respond with status code 400", async () => {	
        // 661e7db82f305c0bf9fcb290 is not a budget id in our database	
        const id = "661e7db82f305c0bf9fcb290"
        const response = await request(app).get(`/budgetinstance/${id}`);	

        expect(response.statusCode).toBe(400);	
        expect(response.headers.location).toBe("/my-budgets");

        const budget = await Budget.findById(id).exec();
        expect(budget).toBeNull();
    });	

    // Test the "/budgetinstance/:id" GET route where there is an error	
    test("Should respond with status code 404", async () => {	
      const response = await request(app).get("/budgetinstance");	
      expect(response.statusCode).toBe(404);	
    });	

});