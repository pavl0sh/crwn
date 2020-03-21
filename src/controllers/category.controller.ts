import Controller from "../interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import CategoryNotFoundException from "../middleware/exceptions/CategoryNotFoundException";
import Category from "../interfaces/category.interface";
import CreateCategoryDto from "../dto/category.dto";
import validationMiddleware from "../middleware/validation.middleware";

class CategoryController implements Controller {
  public path = "/categories";
  public router = Router();
  private categoryService = new CategoryService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.getAllCategories);
    this.router.get(`${this.path}/:id`, this.getCategoryById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateCategoryDto, true),
      this.updateCategory
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateCategoryDto),
      this.createCategory
    );
    this.router.delete(`${this.path}/:id`, this.deleteCategory);
  }

  private getAllCategories = async (response: Response): Promise<void> => {
    const result = await this.categoryService.getAllCategories();
    response.send(result);
  };

  private getCategoryById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const category = await this.categoryService.getCategoryById(id);
    if (category) {
      response.send(category);
    } else {
      next(new CategoryNotFoundException(id));
    }
  };

  private updateCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const category: Category = request.body;
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        id,
        category
      );
      response.send(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  private createCategory = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const categoryData: CreateCategoryDto = request.body;
    const result = await this.categoryService.createCategory(categoryData);
    response.send(result);
  };

  private deleteCategory = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> =>  {
    const id = request.params.id;
    try {
      const result = await this.categoryService.deleteCategory(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
