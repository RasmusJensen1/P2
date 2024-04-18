
const root = document.getElementById("slider-container");

function calculate_dkk(part) {
    return budget.totalIncome * part;
}

function getSliderX(input) {
    return ((input.value - input.min) / (input.max - input.min)) * 100;
}


    let surplusPercentage1 =
            1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);

budget.expenses.forEach((expense) => {
    // Create expense div
    const expense_div = document.createElement("div");

    // Circle to contain the expense name
    const circle = document.createElement("div");
    // Set the text content of the circle to the expense name
    circle.textContent = expense.expenseName;

    // Div to contain the input (range slider) and value
    const input_container = document.createElement("div");

    // Slider input
    const input = document.createElement("input");

    // Value of the slider
    const value = document.createElement("div");
    value.textContent = calculate_dkk(expense.part) + " DKK";

    // Set class names for elements
    value.setAttribute("class", "show-value");
    circle.setAttribute("class", "circle");
    expense_div.setAttribute("class", "expense_div");
    input_container.setAttribute("class", "input-container");

    // Appending expense div to the slider-container
    root.appendChild(expense_div);

    // Add the elements to the expense div
    expense_div.appendChild(circle);
    expense_div.appendChild(input_container);

    // Add elements to the input container
    input_container.appendChild(input);
    input_container.appendChild(value);

    // Set attributes for the input element (range slider)
    input.setAttribute("type", "range");
    input.setAttribute("class", "slider");
    input.setAttribute("id", expense.name);
    input.setAttribute("min", "0");
    input.setAttribute("max", budget.totalIncome);
    input.setAttribute("value", calculate_dkk(expense.part));

    const start_x = getSliderX(input);
    input.style.background = `linear-gradient(90deg, #3c67f4 ${start_x}%, #ffffff ${start_x}%)`;

    
    let maxValue = surplusPercentage1 * budget.totalIncome + Number(input.value);

    document.addEventListener('change', () => {
        maxValue = surplusPercentage1 * budget.totalIncome + Number(input.value);
    })

    input.addEventListener("input", (e) => {

        let newValue = Number(e.target.value);
        if (newValue > maxValue) {
            newValue = maxValue;  // Clamp the value to the maximum
        } else {
            const x = getSliderX(input);
            const color = `linear-gradient(90deg, #3c67f4 ${x}%, #ffffff ${x}%)`;
            input.style.background = color;
        }

        input.value = newValue;
        value.textContent = Math.round(newValue) + " DKK";
    });

    input.addEventListener("change", (e) => {

        const part = input.value / budget.totalIncome;
        expense.part = part;

        surplusPercentage1 =
            1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);

        let newValue = Number(e.target.value);
        if (newValue > maxValue) {
            // Clamp the value to the maximum
            newValue = maxValue;  
        } else {

        }

        const x = getSliderX(input);
        const color = `linear-gradient(90deg, #3c67f4 ${x}%, #ffffff ${x}%)`;
        input.style.background = color;

        input.value = newValue;
        value.textContent = Math.round(newValue) + " DKK";

    });
});
