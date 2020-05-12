import categoryModel from "../models/category.model";
import Category from "../types/category.interface";
import toObjectId from "../helpers/mongoose.helper";
import CategoryNotFoundException from "../middleware/exceptions/CategoryNotFoundException";
import CreateCategoryDto from "../dto/category.dto";

class CategoryService {
  private category = categoryModel;

  public getAllCategories = async (): Promise<Category[]> => {
    return this.category.find();
  };

  public getCategoryById = async (
    id: string
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      return await this.category.findById(toObjectId(id));
    } catch (error) {
      return null;
    }
  };

  public updateCategory = async (
    id: string,
    categoryData: Category
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      return await this.category.findByIdAndUpdate(
        toObjectId(id),
        categoryData,
        { new: true }
      );
    } catch (error) {
      throw new CategoryNotFoundException(id);
    }
  };

  public createCategory = async (
    categoryData: CreateCategoryDto
  ): Promise<Category> => {
    const createdCategory = new this.category({
      ...categoryData
    });
    return await createdCategory.save();
  };

  public deleteCategory = async (
    id: string
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      return await this.category.findByIdAndDelete(toObjectId(id));
    } catch (error) {
      throw new CategoryNotFoundException(id);
    }
  };
}

export default CategoryService;
