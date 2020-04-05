import mongoose from "mongoose";
import User from "../interfaces/user.interface";

const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String
});

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    password: {
      type: String,
      get: (): undefined => undefined
    },
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "supervisor", "admin"]
    },
    address: addressSchema
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

userSchema.virtual("fullName").get(function() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return `${this.firstName} ${this.lastName}`;
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
