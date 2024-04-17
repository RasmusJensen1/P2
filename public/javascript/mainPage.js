const chosenBudget = budget;

console.log(chosenBudget.expenses);

const root = document.getElementById("slider-container");

function calculate_amount(part) {
  return budget.totalIncome * part;
}

chosenBudget.expenses.forEach((expense) => {
  //   Creates each expense changer
  const expense_div = document.createElement("div");
  const circle = document.createElement("div");
  const input_container = document.createElement("div");
  const input = document.createElement("input");
  const value = document.createElement("div");

  circle.textContent = expense.expenseName;
  expense_div.appendChild(circle);

  expense_div.appendChild(input_container);
  input_container.appendChild(input);
  input_container.appendChild(value);

  input.setAttribute("type", "range");
  input.setAttribute("class", "slider");
  input.setAttribute("id", expense.name);
  input.setAttribute("min", "0");
  input.setAttribute("max", budget.totalIncome);
  input.setAttribute("value", calculate_amount(expense.part));

  value.setAttribute("class", "show-value");

  circle.setAttribute("class", "circle");

  expense_div.setAttribute("class", "expense_div");

  input_container.setAttribute("class", "input-container");

  root.appendChild(expense_div);

  const rangeInput = document.querySelector('input[type="range"]');
  const rangeText = document.querySelector(".show-value");

  value.textContent = calculate_amount(expense.part) + " DKK";

  rangeInput.addEventListener("change", (e) => {
    let newVal = e.target.value;
    let negNewVal = -1 * newVal;

    value.textContent = newVal + " DKK";
  });

  rangeInput.addEventListener("input", function () {
    const x =
      ((rangeInput.value - rangeInput.min) /
        (rangeInput.max - rangeInput.min)) *
      100;
    const color = `linear-gradient(90deg, #3c67f4 ${x}%, #ffffff ${x}%)`;
    rangeInput.style.background = color;
  });
});
