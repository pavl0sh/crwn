import User from "./user.interface";

interface AuthResult {
  user: User;
  cookie: string;
}

export default AuthResult;
