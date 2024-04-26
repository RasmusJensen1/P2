const user_controller = require("./userController");
const asyncHandler = require("express-async-handler");
const app = require("../app");
const request = require("supertest");

describe("Testing POST request for sign-up", () => {
  // Should save username and password to database
  //   test("User is added to database", () => {

  test("")

  test("Should respond with status code 200 because user already exists", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "AlbertoDosSilva",
      newPassword: "rasmusSeebach",
      repeatPassword: "rasmusSeebach",
    });
    expect(response.statusCode).toBe(200)
  });
});


