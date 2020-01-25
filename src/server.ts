import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(5000, () => console.log("Server is running"));
