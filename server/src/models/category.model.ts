import mongoose from "mongoose";
import Category from "../types/category.interface";

const categorySchema = new mongoose.Schema({
  title: String,
  imageUrl: String
});

const categoryModel = mongoose.model<Category & mongoose.Document>(
  "Category",
  categorySchema
);

export default categoryModel;
