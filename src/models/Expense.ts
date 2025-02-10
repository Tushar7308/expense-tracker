import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IExpense extends Document {
  userId: ObjectId;
  amount: number;
  category: string;
  isDelete: boolean;
  description?: string;
  createdAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Expense ||
  mongoose.model<IExpense>("Expense", ExpenseSchema);
