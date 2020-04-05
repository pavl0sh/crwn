import userModel from "../models/user.model";
import User from "../interfaces/user.interface";
import CreateUserDto from "../dto/user.dto";
import toObjectId from "../helpers/mongoose.helper";

class UserService {
  private user = userModel;

  public getUserById = async (id: string): Promise<User | null> => {
    try {
      const result: User | null = await this.user.findById(toObjectId(id));
      return result;
    } catch (error) {
      return null;
    }
  };

  public getUserByEmail = async (email: string): Promise<User | null> => {
    const result: User | null = await this.user.findOne({ email: email });
    return result;
  };

  public getUserByEmailWithPassword = async (
    email: string
  ): Promise<User | null> => {
    const userResult = await this.user
      .findOne({ email: email })
      .select("+password");
    return userResult;
  };

  public createUser = async (
    user: CreateUserDto,
    password: string
  ): Promise<User> => {
    const result: User = await this.user.create({ ...user, password });
    return result;
  };
}

export default UserService;
