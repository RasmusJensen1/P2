
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const user_login_cookie = getCookie("user_cookie");
const loggedIn = user_login_cookie ? atob(user_login_cookie) : null; 

const loginButton = document.getElementById("login-button")

const loginLink = document.createElement("a");
loginButton.appendChild(loginLink)


if (!loggedIn) {
    loginLink.href = "/login";
    loginLink.textContent = "Login";
    loginLink.className = "butt login-button";
} else {
    const userName = loggedIn ? JSON.parse(loggedIn).username : null;
    loginLink.href = "/my-budgets";
    loginLink.className = "butt login-button";
    loginLink.textContent = `Welcome ${userName}`;
}