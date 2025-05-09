// models/categoryModel.js

import mongoose from "mongoose";

// Define Category Schema
const categorySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true, // prevent duplicate categories
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Create the model
const Category = mongoose.model("Category", categorySchema);

export default Category;
