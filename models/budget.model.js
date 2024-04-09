const mongoose = require("mongoose");

const { Schema } = mongoose;

const budgetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
    },
    totalIncome: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
    },

    expenses: [{
        expenseName: String,
        part: Number
    }],

    userId: {
        type: Schema.ObjectId,
        required: true
    }
});
const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;