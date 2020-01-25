import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToDB();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToDB(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose
      .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
      .then(() => console.log("DB connected"))
      .catch(err => console.log(`DB Connection Error: ${err.message}`));
  }
}

export default App;
