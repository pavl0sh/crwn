import "dotenv/config";
import App from "./app";
import ExampleController from "./controllers/example/example.controller";
import MongoDbConnection from "./config/db";

const app = new App([new ExampleController()], 5000, new MongoDbConnection());

app.listen();
