import productModel from "../models/product.model";
import CreateProductDto from "../dto/product.dto";
import Product from "../interfaces/product.interface";
import Category from "../interfaces/category.interface";
import ProductNotFoundException from "../middleware/exceptions/ProductNotFoundException";
import toObjectId from "../helpers/mongoose.helper";
import CategoryNotFoundException from "../middleware/exceptions/CategoryNotFoundException";

class ProductService {
  private product = productModel;

  public getAllProductsByCategory = async (
    categoryData: Category
  ): Promise<Product[] | CategoryNotFoundException> => {
    const catId = categoryData._id;
    try {
      const result = await this.product.find({ category: toObjectId(catId) });
      return result;
    } catch (error) {
      throw new CategoryNotFoundException(catId);
    }
  };

  public getProductById = async (
    id: string
  ): Promise<Product | null | ProductNotFoundException> => {
    try {
      const result: Product | null = await this.product.findById(
        toObjectId(id)
      );
      return result;
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
  };

  public updateProduct = async (
    productData: Product
  ): Promise<Product | ProductNotFoundException> => {
    const result = await this.product.findByIdAndUpdate(
      productData._id,
      productData,
      { new: true }
    );
    if (result) {
      return result;
    } else {
      throw new ProductNotFoundException(productData._id);
    }
  };

  public createProduct = async (
    productData: CreateProductDto,
    categoryData: Category
  ): Promise<Product> => {
    const createdProduct = new this.product({
      ...productData,
      category: categoryData._id
    });
    const savedProduct = await createdProduct.save();
    return savedProduct;
  };

  public deleteProduct = async (
    id: string
  ): Promise<Product | null | ProductNotFoundException> => {
    try {
      const result = await this.product.findByIdAndDelete(toObjectId(id));
      return result;
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
  };
}

export default ProductService;
