const User = require("./models/user.model");
const Budget = require("./models/budget.model");
const mongoose = require("mongoose");
const {config} = require("dotenv");
config()

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URL
  

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
  type,
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
      budgetType: type,
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
    "Basic",
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
    "Basic",
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
    "Basic",
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
    "Basic",
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
    "Basic",
    "Daily Expenses",
    4000,
    [
      { expenseName: "Coffee", part: 0.5 },
      { expenseName: "Lunch", part: 0.3 },
      { expenseName: "Transportation", part: 0.1 },
    ]
  );
}
