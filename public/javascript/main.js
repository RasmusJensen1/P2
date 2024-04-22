// Get the user_cookie from the browser, which is set by the backend
const user_login_cookie = getCookie("user_cookie");

// The user_cookie is base64 encoded, so we need to decode it
const loggedIn = user_login_cookie ? atob(decodeURIComponent(user_login_cookie)) : null; 

// We get the login-button div from the DOM
const loginButton = document.getElementById("login-button")

// We create a link element and append it to the loginButton div
const loginLink = document.createElement("a");
loginButton.appendChild(loginLink)

// If the user is not logged in, the link will redirect to the login page
// And the text will be Login
if (!loggedIn) {
    loginLink.href = "/login";
    loginLink.textContent = "Login";
    loginLink.className = "butt login-button";
} 
// If the user IS logged in, the link will redirect to the my-budgets page
// And the text will greet the user
else {
    const userName = loggedIn ? JSON.parse(loggedIn).username : null;
    loginLink.href = "/logout";
    loginLink.className = "butt login-button";
    loginLink.textContent = `Logout ${userName}`;
}

// Cookies are seperated by ;. This function gets the cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Functionality to make the navbar responsive
// Sets the display of the nav-list to block if it is none, and vice versa
document.getElementById('menu-icon').addEventListener('click', () => {
    let navList = document.getElementById('nav-list');
    if (navList.style.display === 'block') {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'block';
    }
})