import { Router, Request, Response, NextFunction } from "express";
import Controller from "../types/controller.interface";
import UserService from "../services/user.service";
import UserNotFoundException from "../middleware/exceptions/UserNotFoundException";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/:id`, this.getUserById);
  }

  private getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const user = await this.userService.getUserById(id);
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };
}

export default UserController;
