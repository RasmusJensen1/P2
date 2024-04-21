// Used to open pop up window to create new expense
function openForm() {
    document.getElementById("create-popup").style.display = "block";
}

// Used to close pop up up window to create new expense
function closeForm() {
    document.getElementById("create-popup").style.display = "none";
}

// Create new expense
function createExpense() {
    // Get the expense name and cost from the input fields
    const expenseName = document.getElementById("expense-name").value;
    const cost = document.getElementById("expense-cost").value;

    // calculate the part of the total income the expense is
    const part = cost / budget.totalIncome;

    // Add the expense to the budget
    budget.expenses.push({ expenseName, part });

    // call the functions which renders all the expenses
    createExpenses();

    // close the pop up
    closeForm();
}


const totalIncomeInput = document.getElementById("input-income");

totalIncomeInput.value = budget.totalIncome;

totalIncomeInput.addEventListener("input", (e) => {
    e.preventDefault();

    // Store the old part as DKK
    const oldPartInDKK = budget.expenses.map(expense => ({
        ...expense,
        part: Math.round(expense.part * budget.totalIncome)
     })
    );

    // Change the total income to the value of the input field
    budget.totalIncome = totalIncomeInput.value;

    // Calculate how large the old part as DKK is in relation to the new total income
    budget.expenses = oldPartInDKK.map((cost) => ({
        ...cost,
        part: cost.part / budget.totalIncome
     })
    );
});

totalIncomeInput.addEventListener('change', (e) => {
    createExpenses();
})

function calculate_dkk(part) {
    return budget.totalIncome * part;
}

function getSliderX(input) {
    return ((input.value - input.min) / (input.max - input.min)) * 100;
}

