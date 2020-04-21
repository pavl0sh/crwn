import mongoose from "mongoose";
import User from "../interfaces/user.interface";

const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, maxlength: 250 },
    email: { type: String, maxlength: 250 },
    firstName: { type: String, maxlength: 100 },
    lastName: { type: String, maxlength: 100 },
    password: {
      type: String,
      select: false
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
