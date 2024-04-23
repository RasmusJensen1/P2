const root = document.getElementById("slider-container");

// A huge function which takes care of rendering the expenses including the sliders
function createExpenses() {
    // this is done to clear the slider container before adding the sliders
    root.innerHTML = "";

    let surplusPercentage1 = 1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);

    budget.expenses.forEach((expense) => {
        // Create expense div
        const expense_div = document.createElement("div");

        // Circle to contain the expense name
        const circle = document.createElement("div");
        const circleText = document.createElement("p");
        const circleHover = document.createElement("span");
        // Set the text content of the circle to the expense name
        circleText.textContent = expense.expenseName;
        circleHover.textContent = expense.expenseName;

        // Div to contain the input (range slider) and value
        const input_container = document.createElement("div");

        // Slider input
        const input = document.createElement("input");

        // Value of the slider
        const value = document.createElement("div");
        value.textContent = Math.round(calculate_dkk(expense.part)) + " DKK";

        // Delete expense tag
        const delete_image = document.createElement("img");

        // Set attributes for the delete expense button
        delete_image.setAttribute("src", "/images/trash_icon.png");
        delete_image.setAttribute("class", "delete-expense-button");

        // Set class names for elements
        value.setAttribute("class", "show-value");
        circle.setAttribute("class", "circle tool-tip");
        expense_div.setAttribute("class", "expense_div");
        input_container.setAttribute("class", "input-container");

        // Appending expense div to the slider-container
        root.appendChild(expense_div);

        // Add the elements to the expense div
        expense_div.appendChild(circle);
        expense_div.appendChild(input_container);
        expense_div.appendChild(delete_image);

        // Add elements to the circle
        circle.appendChild(circleText);
        circle.appendChild(circleHover);

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
            // Calculate part in relation to total income
            const part = input.value / budget.totalIncome;
            // Set the expense part value
            expense.part = part;

            surplusPercentage1 =
                1 - budget.expenses.reduce((prev, next) => prev + next.part, 0);

            let newValue = Number(e.target.value);
            if (newValue > maxValue) {
                // Clamp the value to the maximum
                newValue = maxValue;  
            } 

            const x = getSliderX(input);
            const color = `linear-gradient(90deg, #3c67f4 ${x}%, #ffffff ${x}%)`;
            input.style.background = color;

            input.value = newValue;
            value.textContent = Math.round(newValue) + " DKK";

        });

        delete_image.addEventListener("click", () => {
            let index = budget.expenses.findIndex(exp => exp.name === expense.name);
            if (index !== -1) { // if index is found
                budget.expenses.splice(index, 1);
                expense_div.remove(); 
                updateChart();
            } else {
                console.log("Expense not found");
            }
        });
        
    });

    // A button to add a new expense
    const addExpenseButton = document.createElement("button");

    addExpenseButton.setAttribute("id", "create-expense");
    addExpenseButton.setAttribute("onclick", "openForm()");

    addExpenseButton.textContent = "+";

    root.appendChild(addExpenseButton);

    // Error message for creating expense
    const expenseError = document.createElement("p");

    expenseError.setAttribute("id", "expense-error");

    root.appendChild(expenseError);

}

// Initialize the expenses
createExpenses();


function postRequest() {

    const options = {
      method: 'POST',
      body: JSON.stringify(budget),
      headers: {
          'Content-Type': 'application/json' 
      },
    };

    const url = "/budgetinstance/" + budget._id;

    fetch(url, options).then((res) => {
        if(res.status === 401) {
            alert("Must be logged in to save. Download budget for later use."); 
        } else {
            const saved = document.getElementById("expense-error");
            document.getElementById('not-saved').style.display = 'none';
 
            saved.style.color = "#00C105";
            saved.style.display = "block";
            saved.textContent = "Budget saved";
            saved.style.fontSize = 24 + "px";
            saved.style.position = "fixed";
            saved.style.right = 320 + "px";
            saved.style.bottom = 26 + "px";

            setTimeout(() => {
                saved.style.display = "none";
                saved.style.color = "red";
                saved.style.fontSize = 15 + "px";
                saved.style.position = "relative";
                saved.style.right = "";
                saved.style.bottom = "";
            }, 1500);
        }
    });
}

// Download JSON file by clicking on the download icon or download text

// Get download button element
const downloadButton = document.getElementById('download-text');

// event listener for the download button
downloadButton.addEventListener('click', handleDownloadButtonClick);

// handling for the download button when it is clicked
function handleDownloadButtonClick() {
  
  // object into a JSON string 
  const chartConfigJSON = JSON.stringify(budget);

  // Converting the JSON string into a data URI format
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(chartConfigJSON);

  // Linking element with href
  const downloadLink = document.createElement('a');
  downloadLink.href = dataUri;
  downloadLink.download = budget.name; // file name for the downloaded the budget 

  downloadLink.click();
}

// Download icon
const downloadImage = document.querySelector('.download-image');

// EventListener for the download icon or text so when clicked it downloads
downloadImage.addEventListener('click', function() {
  // clicks the hidden download button. Refer to css to see it is hidden
  downloadButton.click();
});