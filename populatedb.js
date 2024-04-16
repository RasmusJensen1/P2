const User = require("./models/user.model");
const Budget = require("./models/budget.model");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://shafesadiq03:kiyTUWgW4lme6WJV@cluster0.5iseri8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await createUsersAndBudgets();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB database");
}

async function create_user_and_budgets(
  username,
  password,
  budgetName,
  totalIncome,
  expenses
) {
  try {
    const user = await User.create({
      username: username,
      password: password,
    });
    console.log(`User ${username} created successfully`);

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.part, 0);

    const budget = await Budget.create({
      name: budgetName,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      expenses: expenses,
      userId: user._id,
    });
    console.log(`Budget created successfully for user ${username}`);
  } catch (error) {
    console.error(`Error creating user or budget for ${username}:`, error);
  }
}

async function createUsersAndBudgets() {
  await create_user_and_budgets(
    "JohnDoe",
    "password123",
    "Monthly Budget",
    5000,
    [
      { expenseName: "Rent", part: 0.4 },
      { expenseName: "Groceries", part: 0.1 },
      { expenseName: "Utilities", part: 0.2 },
      { expenseName: "Entertainment", part: 0.2 },
    ]
  );

  await create_user_and_budgets(
    "AliceSmith",
    "letmeinnowplease",
    "Weekly Allowance",
    6000,
    [
      { expenseName: "Dining out", part: 0.1 },
      { expenseName: "Shopping", part: 0.2 },
      { expenseName: "Transportation", part: 0.5 },
    ]
  );

  await create_user_and_budgets(
    "BobJohnson",
    "securepass",
    "Biweekly Expenses",
    7000,
    [
      { expenseName: "Bills", part: 0.8 },
      { expenseName: "Gas", part: 0.1 },
      { expenseName: "Groceries", part: 0.1 },
    ]
  );

  await create_user_and_budgets(
    "EmmaBrown",
    "testpassword",
    "Yearly Budget",
    8000,
    [
      { expenseName: "Rent", part: 0.5 },
      { expenseName: "Vacation", part: 0.2 },
      { expenseName: "Savings", part: 0.3 },
    ]
  );

  await create_user_and_budgets(
    "MichaelDavis",
    "pass1234567",
    "Daily Expenses",
    4000,
    [
      { expenseName: "Coffee", part: 0.5 },
      { expenseName: "Lunch", part: 0.3 },
      { expenseName: "Transportation", part: 0.1 },
    ]
  );
}
