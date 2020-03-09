import HttpException from "./HttpException";

class WrongCredsException extends HttpException {
  constructor() {
    super(401, "Wrong credentials provided");
  }
}

export default WrongCredsException;
