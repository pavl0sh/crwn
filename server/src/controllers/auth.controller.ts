import { Request, Response, NextFunction, Router } from "express";
import Controller from "../types/controller.interface";
import CreateUserDto from "../dto/user.dto";
import AuthService from "../services/auth.service";
import validationMiddleware from "../middleware/validation.middleware";
import AuthResult from "../types/authResult.interface";
import LogInDto from "../dto/logIn.dto";

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
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.logIn
    );
    this.router.post(`${this.path}/logout`, this.logOut);
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const userData: CreateUserDto = request.body;
    try {
      const authResult: AuthResult = await this.authService.register(userData);
      response.setHeader("Set-Cookie", [authResult.cookie]);
      response.send(authResult.user);
    } catch (error) {
      next(error);
    }
  };

  private logIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const logInData: LogInDto = request.body;
    try {
      const authResult: AuthResult = await this.authService.loggingIn(
        logInData
      );
      response.setHeader("Set-Cookie", [authResult.cookie]);
      response.send(authResult.user);
    } catch (error) {
      next(error);
    }
  };

  private logOut = (request: Request, response: Response): void => {
    response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    response.sendStatus(200);
  };
}

export default AuthenticationController;
