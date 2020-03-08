import { Request, Response, NextFunction, Router } from "express";
import * as bcrypt from "bcrypt";
import Controller from "../interfaces/controller.interface";
import userModel from "../models/user.model";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = userModel;

  private initializeRoutes(): void {
    this.router.get(`${this.path}/register`);
    this.router.get(`${this.path}/login`);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    
  }
}