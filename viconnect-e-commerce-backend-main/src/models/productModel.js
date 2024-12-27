import mongoose from "mongoose";

//Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    },
    color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    },
    productImage: [ {
          type: String,
          required: true,
        },
    ],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    total_price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },

  {
    timestamps: true,
  }
); 

export const Product = mongoose.model("Product", productSchema);

