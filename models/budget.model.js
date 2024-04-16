const mongoose = require("mongoose");

const { Schema } = mongoose;

const budgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalIncome: {
      type: Number,
    },
    totalExpense: {
      type: Number,
    },

    expenses: [
      {
        expenseName: String,
        part: Number,
      },
    ],
    budgetType: {
      type: String,
      enum: ["Basic"],
    },
    userId: {
      type: Schema.ObjectId,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
