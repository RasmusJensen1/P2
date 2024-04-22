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
    if (!budget.totalIncome) {
        // Errorhandling: Income has not yet been input
        const expenseError = document.getElementById("expense-error");
        expenseError.style.display = "block";
        expenseError.textContent = "Must input total income before adding expenses";
        closeForm();
    } else if (
        document.getElementById("expense-cost").value >
        (1 - budget.expenses.reduce((prev, next) => prev + next.part, 0)) *
        budget.totalIncome
    ) {
        // Errorhandling: Expense surpases total income
        const expenseError = document.getElementById("expense-error");
        expenseError.style.display = "block";
        expenseError.textContent = "Cannot add expense that surpas total income";
        closeForm();
    } else {
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
}

const totalIncomeInput = document.getElementById("input-income");

totalIncomeInput.value = budget.totalIncome;

totalIncomeInput.addEventListener("input", (e) => {
    e.preventDefault();


    if (totalIncomeInput.value < (1 - budget.expenses.reduce((prev, next) => prev + next.part, 0)) * budget.totalIncome) {
        const expenseError = document.getElementById("expense-error");
        expenseError.style.display = "block";
        expenseError.textContent = "Total income is less than your added expenses, adjust expenses to complete this action";
        closeForm();

        setTimeout(() => {
            expenseError.style.display = "none";
        }, 1500);
    } else {
        // Store the old part as DKK
        const oldPartInDKK = budget.expenses.map((expense) => ({
            ...expense,
            part: Math.round(expense.part * budget.totalIncome),
        }));

        // Change the total income to the value of the input field
        budget.totalIncome = totalIncomeInput.value;

        // Calculate how large the old part as DKK is in relation to the new total income
        budget.expenses = oldPartInDKK.map((cost) => ({
            ...cost,
            part: cost.part / budget.totalIncome,
        }));
    }
});

totalIncomeInput.addEventListener("change", (e) => {
    createExpenses();
});

function calculate_dkk(part) {
    return budget.totalIncome * part;
}

function getSliderX(input) {
    return ((input.value - input.min) / (input.max - input.min)) * 100;
}
