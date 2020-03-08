import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import CreateUserDto from "../dto/user.dto";
import AuthService from "../services/auth.service";
import validationMiddleware from "../middleware/validation.middleware";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  public authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(`${this.path}/login`);
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, createdUser } = await this.authService.register(userData);
      response.setHeader("Set-Cookie", [cookie]);
      response.send(createdUser);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthenticationController;
