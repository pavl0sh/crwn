import "dotenv/config";
import App from "./app";
import MongoDbConnection from "./config/db";
import AuthenticationController from "./controllers/auth.controller";
import UserController from "./controllers/user.controller";
import CategoryController from "./controllers/category.controller";
import ProductController from "./controllers/product.controller";

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new ProductController(),
    new CategoryController()
  ],
  new MongoDbConnection()
);

app.listen();
