const user_controller = require("./userController");
const asyncHandler = require("express-async-handler");
const app = require("../app");
const request = require("supertest");

describe("Testing POST request for sign-up", () => {
  // Should save username and password to database
  //   test("User is added to database", () => {


// User already exist
  test("Should respond with status code 200 because user already exists", async () => {
    const response = await request(app).post("/sign-up").send({
      newUsername: "AlbertoDosSilva",
      newPassword: "rasmusSeebach",
      repeatPassword: "rasmusSeebach",
    });
    expect(response.statusCode).toBe(200)
  });
});



// Testing if user is added to database when signing up with new username and password and it redirects to login page
test("Should respond with status code 302 for new user added and redirected", async () => {
  const newUsername = makeid(10);
  const newPassword = makeid(10);

  const response = await request(app)
    .post("/sign-up")
    .send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword, 
    });
  

  expect(response.statusCode).toBe(302);
});


// random string for newUsername and newPassword
function makeid(length) { 
  var result = ''; 
  var characters = 'ABCDEFGHIJKLMOWADAKJSNASDabcdefghijklmnopqrstuvwxyz0123456789'; 
  var charactersLength = characters.length; 
  for ( var i = 0; i < length; i++ ) { 
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
  } 
  return result; 
}

// Password to short
test("Should respond with status code 200 because password is to short", async () => {
  const newUsername = makeid(2);
  const newPassword = makeid(2);

  const response = await request(app)
    .post("/sign-up")
    .send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword, 
    });
  

  expect(response.statusCode).toBe(200);
});

// Password to long
test("Should respond with status code 200 because password is to long", async () => {
  const newUsername = makeid(50);
  const newPassword = makeid(50);

  const response = await request(app)
    .post("/sign-up")
    .send({
      newUsername: newUsername,
      newPassword: newPassword,
      repeatPassword: newPassword, 
    });
  

  expect(response.statusCode).toBe(200);
});

// Whitespace username
test("Should respond with status code 200 because username contains whitespace", async () => {
  const response = await request(app).post("/sign-up").send({
    newUsername: "Alberto DosSilva",
    newPassword: "rasmusSeebach",
    repeatPassword: "rasmusSeebach",
  });
  expect(response.statusCode).toBe(200)
});

// Whitespace password
test("Should respond with status code 200 because password contains whitespace", async () => {
  const response = await request(app).post("/sign-up").send({
    newUsername: "AlbertoDosSilva",
    newPassword: "rasmus Seebach",
    repeatPassword: "rasmus Seebach",
  });
  expect(response.statusCode).toBe(200)
});

// NewPassword and ReapeatPassword doesnt match
test("Should respond with status code 200 because passwords does not match", async () => {
  const response = await request(app).post("/sign-up").send({
    newUsername: "AlbertoDosSilva",
    newPassword: "rasmusSeebach",
    repeatPassword: "rasmusQSeebach",
  });
  expect(response.statusCode).toBe(200)
});

// User logout testing if cookies are cleared
test("Should respond with repsonse usercookie", async () => {
  const response = await request(app).get("/logout");
  expect(response.cookies.user_cookies).toBe("");
});


