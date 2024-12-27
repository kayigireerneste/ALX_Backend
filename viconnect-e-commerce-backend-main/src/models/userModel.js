import mongoose from "mongoose";

//User Schema
const userSchema = new mongoose.Schema({            
    email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  FullName: String,
  phone: { type: Number, unique: true, sparse: true },
  userName: String,
  gender: {
    type: String, 
    enum: ['Male', 'Female'],
  },
  profileImage: {
    type: String,
    default: 'avataaars.png',
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  location: {
    type: String,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],

  refreshToken: {type: String},

  role:{type:String, default:"user"},
  
  resetOTP: {
    type: String,
    default: null,
  },

  resetOTPExpiry: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true,
}
);

userSchema.methods.addToWishlist = function(productId) {
  if (!this.wishlist.includes(productId)) {
    this.wishlist.push(productId);
    return this.save();
  }
  return Promise.resolve(this);
};

export const User = mongoose.model("user", userSchema);
