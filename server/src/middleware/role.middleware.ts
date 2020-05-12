import RequestWithUser from "../types/requestWithUser.interface";
import { NextFunction, Response } from "express";
import HttpException from "./exceptions/HttpException";

function roleMiddleware(roles: Array<string>) {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    //Get the user ID from previous middleware
    const role = req.user.role;
    if (roles.indexOf(role) > 1) {
      next();
    } else {
      next(new HttpException(401, "You don't have permission to view this."));
    }
  };
}

export default roleMiddleware;
