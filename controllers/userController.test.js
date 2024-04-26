const app = require("../app");
const request = require("supertest");
const User = require("../models/user.model");

describe("Testing POST request for sign-up", () => {
  // Testing if user is added to database when signing up with new username and password and it redirects to login page
  test("Should respond with status code 302 for new user added and redirected", async () => {
    const newUsername = makeid(10);
    const newPassword = makeid(10);

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
    const newUsername = makeid(2);
    const newPassword = makeid(2);

    const response = await request(app).post("/sign-up").send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword,
    });

    expect(response.statusCode).toBe(400);
  });

  // Password too long
  test("Should respond with status code 400 because password is too long", async () => {
    const newUsername = makeid(50);
    const newPassword = makeid(50);

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

  // NewPassword and ReapeatPassword doesnt match
  test("Should respond with status code 400 because passwords does not match", async () => {
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

// User login testing if cookies have been cleared after logut
function getCookie(name, cookies) {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// random string for newUsername and newPassword
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMOWADAKJSNASDabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
