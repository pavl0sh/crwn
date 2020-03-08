import userModel from "../models/user.model";
import User from "../interfaces/user.interface";
import CreateUserDto from "../dto/user.dto";

class UserService {
  private user = userModel;

  public getUserById = async (id: string): Promise<User | null> => {
    const result: User | null = await this.user.findById(id);
    return result;
  };

  public getUserByEmail = async (email: string): Promise<User | null> => {
    const result: User | null = await this.user.findOne({ email: email });
    return result;
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
