import Controller from "../types/controller.interface";
import { Response, Router, Request, NextFunction } from "express";
import ProductService from "../services/product.service";
import ProductNotFoundException from "../middleware/exceptions/ProductNotFoundException";
import Product from "../types/product.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateProductDto from "../dto/product.dto";
import Role from "../types/role.enum";

class ProductController implements Controller {
  public path = "/products";
  public router = Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/categories/:id`,
      this.getAllProductsByCategory
    );
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware([Role.Admin, Role.Supervisor]),
      validationMiddleware(CreateProductDto, true),
      this.updateProduct
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      roleMiddleware([Role.Admin, Role.Supervisor]),
      validationMiddleware(CreateProductDto),
      this.createProduct
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware([Role.Admin]),
      this.deleteProduct
    );
  }

  private getAllProductsByCategory = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const catId = request.params.id;
    const result = await this.productService.getAllProductsByCategory(catId);
    response.send(result);
  };

  private getProductById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const product = await this.productService.getProductById(id);
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  };

  private updateProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const product: Product = request.body;
    try {
      const updatedProduct = await this.productService.updateProduct(
        id,
        product
      );
      response.send(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  private createProduct = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const productData: CreateProductDto = request.body;
    const result = await this.productService.createProduct(productData);
    response.send(result);
  };

  private deleteProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    try {
      const result = await this.productService.deleteProduct(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
