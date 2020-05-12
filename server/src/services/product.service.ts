import productModel from "../models/product.model";
import CreateProductDto from "../dto/product.dto";
import Product from "../types/product.interface";
import ProductNotFoundException from "../middleware/exceptions/ProductNotFoundException";
import toObjectId from "../helpers/mongoose.helper";
import CategoryNotFoundException from "../middleware/exceptions/CategoryNotFoundException";

class ProductService {
  private product = productModel;

  public getAllProductsByCategory = async (
    catId: string
  ): Promise<Product[] | CategoryNotFoundException> => {
    try {
      return await this.product.find({ category: toObjectId(catId) });
    } catch (error) {
      throw new CategoryNotFoundException(catId);
    }
  };

  public getProductById = async (
    id: string
  ): Promise<Product | null | ProductNotFoundException> => {
    try {
      return await this.product.findById(toObjectId(id));
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
  };

  public updateProduct = async (
    id: string,
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
    productData: CreateProductDto
  ): Promise<Product> => {
    const createdProduct = new this.product({
      ...productData
    });
    return await createdProduct.save();
  };

  public deleteProduct = async (
    id: string
  ): Promise<Product | null | ProductNotFoundException> => {
    try {
      return await this.product.findByIdAndDelete(toObjectId(id));
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
  };
}

export default ProductService;
