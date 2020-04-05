import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import DbConnection from "./interfaces/dbConnection.interface";

class App {
  public app: express.Application;
  public port: number;
  public db: DbConnection;

  constructor(controllers: Controller[], port: number, db: DbConnection) {
    this.app = express();
    this.port = port;
    this.db = db;

    this.db.connect();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "1mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "1mb",
        extended: true,
        parameterLimit: 1000
      })
    );
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
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
}

export default App;
