// Create a new file, e.g., payment.model.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Successful", "Failed"],
    default: "Pending",
  },
  ref: {
    type: String,
  },
},
{
  timestamps: true,
});

export const Payment = mongoose.model("Payment", paymentSchema);
