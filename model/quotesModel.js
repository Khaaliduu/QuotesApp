// models/quoteModel.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    Background_Image: {
      type: String,
      required: true,
    },
    English_Quotes: {
      type: String,
      required: true,
    },
    Somali_Quotes: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
);

const Quotes = mongoose.model('Quote', quoteSchema);

export default Quotes;
