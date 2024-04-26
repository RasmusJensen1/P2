const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Budget = require('./models/budget.model');

let mongoServer;

// Create a connection to the in-memory database. Before running any tests, connect to the database.
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Does this to connect app to the memory database
    process.env.MONGODB_URL = mongoUri;
});


beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({}).exec();
    const user = await User.create({ username: 'testuser', password: 'testpassword' });

    await Budget.deleteMany({}).exec();
    await Budget.create({ name: 'testBudgetName', budgetType: 'Basic', userId: user._id, totalIncome: 1000, expenses: [{ expenseName: 'Rent', part: 0.5 }, { expenseName: 'Food', part: 0.2 }] });

});

// Clear all test data after every test.
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});