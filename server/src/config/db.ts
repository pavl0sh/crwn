import mongoose from "mongoose";
import DbConnection from "../types/dbConnection.interface";

class MongoDbConnection implements DbConnection {
  connect(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose
      .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log("DB connected"))
      .catch(err => console.log(`DB Connection Error: ${err.message}`));
  }
}

export default MongoDbConnection;
