import mongoose from "mongoose";

//Product categorySchema
const categorySchema = new mongoose.Schema({            
categoryName: {
    type: String,
    required: true,
    unique: true,
    index: true,
},

image: {
  type: String,
  required: true,
},

},
{
    timestamps: true,
  }
)

export const Category = mongoose.model("category", categorySchema);







// Brand Schema 
const brandSchema = new mongoose.Schema({ 
    brandName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },

)

export const Brand = mongoose.model("brand", brandSchema);






//ColorScema
const colorSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Color = mongoose.model("Color", colorSchema);