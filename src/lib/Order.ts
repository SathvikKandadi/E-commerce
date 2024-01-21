import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  shoe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shoe", 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);


