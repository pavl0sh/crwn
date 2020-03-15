import categoryModel from "../models/category.model";
import Category from "../interfaces/category.interface";
import toObjectId from "../helpers/mongoose.helper";
import CategoryNotFoundException from "../middleware/exceptions/CategoryNotFoundException";
import CreateCategoryDto from "../dto/category.dto";

class CategoryService {
  private category = categoryModel;

  public getAllCategories = async (): Promise<Category[]> => {
    const categories: Category[] = await this.category.find();
    return categories;
  };

  public getCategoryById = async (
    id: string
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      const result: Category | null = await this.category.findById(
        toObjectId(id)
      );
      return result;
    } catch (error) {
      return null;
    }
  };

  public updateCategory = async (
    id: string,
    categoryData: Category
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      const result = await this.category.findByIdAndUpdate(
        toObjectId(id),
        categoryData,
        { new: true }
      );
      return result;
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
    const savedCategory = await createdCategory.save();
    return savedCategory;
  };

  public deleteCategory = async (
    id: string
  ): Promise<Category | null | CategoryNotFoundException> => {
    try {
      const result = await this.category.findByIdAndDelete(toObjectId(id));
      return result;
    } catch (error) {
      throw new CategoryNotFoundException(id);
    }
  };
}

export default CategoryService;
