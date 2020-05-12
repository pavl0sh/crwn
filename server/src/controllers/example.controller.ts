import express from "express";
import Example from "../types/example.interface";
import Controller from "../types/controller.interface";

class ExampleController implements Controller {
  public path = "/example";
  public router = express.Router();

  private examples: Example[] = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum"
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.get(this.path);
  }

  getAll = (request: express.Request, response: express.Response): void => {
    response.send(this.examples);
  };

  createExample = (
    request: express.Request,
    response: express.Response
  ): void => {
    const example: Example = request.body;
    this.examples.push(example);
    response.send(example);
  };
}

export default ExampleController;
