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
        required: true
    },
    totalIncome: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
        required: true
    }
});
