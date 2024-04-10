let button = document.getElementById("create-account-btn");

const newPassword = document.getElementById("newPassword");
const repeatPassword = document.getElementById("repeatPassword");

button.addEventListener("click", () => {
  console.log("New Password:", newPassword);
  console.log("Repeat Password:", repeatPassword);
});
