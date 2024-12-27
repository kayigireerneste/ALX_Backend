
import mongoose from 'mongoose';
import { Product } from './productModel';
import {Color} from './prodCategoryModel';


const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
        },
        count: Number,
        
        price: Number,
      },
    ],
   
    cartby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


export const Cart = mongoose.model('Cart', cartSchema);





export const populateCartItems = async (cart) => {
  const productsInCart = await Promise.all(
    cart.products.map(async (cartProduct) => {
      
      const populatedProduct = await Product.findById(cartProduct.product).select('-createdAt -updatedAt');
      
      const populatedColor = await Color.findById(cartProduct.color).select('-createdAt -updatedAt');
    
      return {
        _id: cartProduct._id,
        count: cartProduct.count,
        populatedProduct,
        populatedColor,
      };
    })
  );

  return { ...cart.toObject(), products: productsInCart };
}