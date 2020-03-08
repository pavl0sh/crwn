import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";
import CreateUserDto from "../dto/user.dto";
import UserService from "./user.service";
import UserWithThatEmailAlreadyExistsException from "../middleware/exceptions/UserWithThatEmailAlreadyExistsException";
import TokenData from "../interfaces/tokenData.interface";

class AuthService {
  private userService = new UserService();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async register(userData: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userData.email);
    if (user) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = await this.userService.createUser(
      userData,
      hashedPassword
    );
    const token = this.createToken(createdUser);
    const cookie = this.createCookie(token);
    return {
      cookie,
      createdUser
    };
  }

  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; //hour
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthService;
