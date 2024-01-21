import mongoose from 'mongoose';

const shoeSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [Number],
    required: true,
  },
});

export default mongoose.models.Shoe || mongoose.model('Shoe', shoeSchema);
