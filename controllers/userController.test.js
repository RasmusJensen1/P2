const asyncHandler = require("express-async-handler");
const app = require("../app");
const request = require("supertest");

describe("Testing POST request for sign-up", () => {
  // Should save username and password to database
  //   test("User is added to database", () => {

  test("Should respond with status code 200 because user already exists", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "AlbertoDosSilva",
      newPassword: "rasmusSeebach",
      repeatPassword: "rasmusSeebach",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing POST request for login", () => {

  // Tests for cookie to match username and cookie is successfully set
  test("Cookie is set successfully", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(response.header).toHaveProperty('set-cookie');

    const setCookie = response.headers['set-cookie'];

    const user = JSON.parse(atob(getCookie("user_cookie", setCookie)));

    expect(user.username).toEqual("testuser");
  });

  // expect status code 302 when login succeeds and redirected to "/my-budgets"
  test("Should respond with status code 302 when login succeeds and user found in the database", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(response.headers.location).toBe("/my-budgets");
    expect(response.statusCode).toBe(302);

    const user = await User.findOne({ username: 'testuser' });
    expect(user).not.toBeNull();
  });

  // expect status code 400 when login fails
  test("Should respond with status code 400 when user is not found", async () => {
    const response = await request(app).post("/login").send({
      username: "wrongUsername",
      password: "wrongPassword",
    });
    expect(response.statusCode).toBe(400);
  });
});

function getCookie(name, cookie) {
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
