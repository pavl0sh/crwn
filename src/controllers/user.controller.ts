import {Router} from "express";
import Controller from "../interfaces/controller.interface";
import userModel from "../models/user.model";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private user = userModel;

  constructor() {}

  private initializeRoutes(): void {
    this.router.get(this.path);
  }
}
