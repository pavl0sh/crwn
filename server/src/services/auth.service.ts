import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";
import CreateUserDto from "../dto/user.dto";
import UserService from "./user.service";
import UserWithThatEmailAlreadyExistsException from "../middleware/exceptions/UserWithThatEmailAlreadyExistsException";
import TokenData from "../interfaces/tokenData.interface";
import LogInDto from "../dto/logIn.dto";
import WrongCredsException from "../middleware/exceptions/WrongCredsExceptions";
import AuthResult from "../interfaces/authResult.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken";

class AuthService {
  private userService = new UserService();

  public async register(userData: CreateUserDto): Promise<AuthResult> {
    const userResult = await this.userService.getUserByEmail(userData.email);
    if (userResult) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.role = userData.role || "basic";
    const user = await this.userService.createUser(userData, hashedPassword);
    const token = this.createToken(user);
    const cookie = this.createCookie(token);
    return { user, cookie };
  }

  public async loggingIn(logInData: LogInDto): Promise<AuthResult> {
    const user = await this.userService.getUserByEmailWithPassword(
      logInData.email
    );
    if (user) {
      const isPaswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      user.password = undefined;
      if (isPaswordMatching) {
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return { user, cookie };
      } else {
        throw new WrongCredsException();
      }
    } else {
      throw new WrongCredsException();
    }
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; //hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthService;
