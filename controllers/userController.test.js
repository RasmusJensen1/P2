const app = require("../app");
const request = require("supertest");
const User = require("../models/user.model");

describe("Testing POST request for sign-up", () => {
  // User should be added to database when signing up with new username and password and it redirects to login page
  test("Should respond with status code 302 for new user added and redirected", async () => {
    const newUsername = generateString(10);
    const newPassword = generateString(10);

    const response = await request(app).post("/sign-up").send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword,
    });

    expect(response.statusCode).toBe(302);

    // Ensure the user was saved in the database
    const user = await User.findOne({
      username: newUsername,
      password: newPassword,
    });
    expect(user).not.toBeNull();
  });

  // Password too short
  test("Should respond with status code 400 because password is too short", async () => {
    const newUsername = generateString(2);
    const newPassword = generateString(2);

    const response = await request(app).post("/sign-up").send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword,
    });

    expect(response.statusCode).toBe(400);
  });

  // Password too long
  test("Should respond with status code 400 because password is too long", async () => {
    const newUsername = generateString(50);
    const newPassword = generateString(50);

    const response = await request(app).post("/sign-up").send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword,
    });

    expect(response.statusCode).toBe(400);
  });

  // Whitespace username
  test("Should respond with status code 400 because username contains whitespace", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "test username",
      newPassword: "testpassword",
      repeatPassword: "testpassword",
    });
    expect(response.statusCode).toBe(400);
  });

  // Whitespace password
  test("Should respond with status code 400 because password contains whitespace", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "testusername",
      newPassword: "test password",
      repeatPassword: "test password",
    });
    expect(response.statusCode).toBe(400);
  });

  // NewPassword and ReapeatPassword do not match
  test("Should respond with status code 400 because passwords do not match", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "testusername",
      newPassword: "testpassword",
      repeatPassword: "notthesamepassword",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Should respond with status code 400 because username is already in the database", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "testuser",
      newPassword: "testpassword",
      repeatPassword: "testpassword",
    });
    expect(response.statusCode).toBe(400);

    const user = await User.findOne({
      username: "testuser",
    });
    expect(user).not.toBeNull();
    expect(user.username).toEqual("testuser");
  });
});

describe("Testing POST request for login", () => {
  // Tests for cookie to match username and cookie is successfully set
  test("Should set Cookie", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(response.header).toHaveProperty("set-cookie");

    const user = JSON.parse(
      atob(getCookie("user_cookie", response.headers["set-cookie"]))
    );

    expect(user.username).toEqual("testuser");
  });

  // expect status code 302 when login succeeds
  test("Should respond with status code 302 when login succeeds and user found in the database", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(response.headers.location).toBe("/my-budgets");
    expect(response.statusCode).toBe(302);

    // Ensure user was found in the database
    const user = await User.findOne({ username: "testuser" });
    expect(user).not.toBeNull();
  });

  // expect status code 400 when login fails
  test("Should respond with status code 400 when user is not found in the database", async () => {
    const response = await request(app).post("/login").send({
      username: "wrongUsername",
      password: "wrongPassword",
    });
    expect(response.statusCode).toBe(400);

    const user = await User.findOne({
      username: "wrongUsername",
      password: "wrongPassword",
    });
    expect(user).toBeNull();
  });
});

function getCookie(name, cookie) {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// random string for newUsername and newPassword
function generateString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMOWADAKJSNASDabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
