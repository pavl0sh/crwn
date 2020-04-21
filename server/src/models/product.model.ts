import mongoose from "mongoose";
import Product from "../interfaces/product.interface";

const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  category: {
    ref: "Category",
    type: mongoose.Types.ObjectId
  }
});

const productModel = mongoose.model<Product & mongoose.Document>(
  "Product",
  productSchema
);

export default productModel;
