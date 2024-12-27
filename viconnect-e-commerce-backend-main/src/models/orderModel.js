import mongoose from "mongoose";
import User from "./userModel";
import { Product } from "./productModel";
import { Brand, Category, Color } from "./prodCategoryModel";

//order Schema
const orderSchema = new mongoose.Schema({            
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: {
                type: Number,
              },
            color: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color",
              },
              category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
              },
              brand: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Brand",
              },
        },
    ],
  
    shippingAddress: {
      type: String,
    },
    orderStatus: {
   type: String,
   enum: ["Pending", "Completed"],
   default: "Pending",
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
        },
    totalOrderPrice: {
      type: Number,
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
   
    },
    {
        timestamps: true,
      }
    )

    
    export const Order = mongoose.model("order", orderSchema);



    export const populateItemDetails = async (model, item) => {
      if (model === 'order') {
        return await populateDetails(item, populateOrderItemDetails);
      } else {
        throw new Error('Unsupported model type');
      }
    };
    
    const populateDetails = async (item, itemDetailsFunction) => {
      const products = await Promise.all(
        item.products.map(async (itemProduct) => {
          return await itemDetailsFunction(itemProduct);
        })
      );
    
      return { ...item.toObject(), products };
    };
    
        
    const populateOrderItemDetails = async (orderProduct) => {
      return await populateProductDetails(orderProduct, 'quantity');
    };
    
    const populateProductDetails = async (productItem, quantityKey) => {
      const populatedProduct = await Product.findById(productItem.product).select('-createdAt -updatedAt');
      const populatedColor = await Color.findById(productItem.color).select('-createdAt -updatedAt');
      const populatedCategory = await Category.findById(productItem.category).select('-createdAt -updatedAt');
      const populatedBrand = await Brand.findById(productItem.brand).select('-createdAt -updatedAt');
      return {
        _id: productItem._id,
        count: productItem.count,
        populatedProduct,
        populatedColor,
      };
    };