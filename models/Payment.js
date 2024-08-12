import mongoose from "mongoose";

const schema = new mongoose.Schema({
  cashfree_session_id: {
    type: String,
    required: true,
  },
  cashfree_payment_id: {
    type: String,
    required: true,
  },
  cashfree_signature: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);
