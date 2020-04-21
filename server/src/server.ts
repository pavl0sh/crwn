import "dotenv/config";
import App from "./app";
import MongoDbConnection from "./config/db";
import AuthenticationController from "./controllers/auth.controller";
import UserController from "./controllers/user.controller";
import ExampleController from "./controllers/example.controller";

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new ExampleController()
  ],
  new MongoDbConnection()
);

app.listen();
