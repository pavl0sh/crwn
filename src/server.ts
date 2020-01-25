import "dotenv/config";
import App from "./app";
import ExampleController from "./controllers/example/example.controller";

const app = new App([new ExampleController()], 5000);

app.listen();
