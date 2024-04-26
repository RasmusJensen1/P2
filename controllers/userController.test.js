const app = require("../app");
const request = require("supertest");
const User = require("../models/user.model");

describe("Testing POST request for sign-up", () => {
  // Should save username and password to database

  test("Should respond with status code 200 because user does not exists", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "testusername",
      newPassword: "testpassword",
      repeatPassword: "testpassword",
    });
    expect(response.statusCode).toBe(200)

  // Ensure the user was saved in the database
  const user = await User.findOne({ username: 'testusername' });
  expect(user).not.toBeNull();
  });
});


