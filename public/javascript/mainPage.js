const root = document.getElementById("slider-container"); //or target div

const expense = document.createElement("div");

const circle = document.createElement("div");

const input_container = document.createElement("div");
const input = document.createElement("input");
const value = document.createElement("div");

circle.textContent = "House";
expense.appendChild(circle);

expense.appendChild(input_container);
input_container.appendChild(input);
input_container.appendChild(value);

input.setAttribute("type", "range");
input.setAttribute("class", "slider");
input.setAttribute("id", "my-range");
input.setAttribute("min", "0");
input.setAttribute("max", "100");
input.setAttribute("value", "50");

value.setAttribute("class", "show-value");

circle.setAttribute("class", "circle");

expense.setAttribute("class", "expense");

input_container.setAttribute("class", "input-container");

root.appendChild(expense);

const rangeInput = document.querySelector('input[type="range"]');
const rangeText = document.querySelector(".show-value");

value.textContent = 50 + " DKK";

rangeInput.addEventListener("change", (e) => {
  let newVal = e.target.value;
  let negNewVal = -1 * newVal;

  value.textContent = newVal + " DKK";
});

slider.addEventListener("mousemove", function () {
  var x = slider.value;
  var color =
    "linear-gradient(90deg, rgb(117,252,117)" +
    x +
    "%, rgb()214,214,214)" +
    x +
    "%)";
  slider.style.background = color;
});
