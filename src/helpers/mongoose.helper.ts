import mongoose from "mongoose";

function toObjectId(id: string): mongoose.Types.ObjectId {
  return mongoose.Types.ObjectId.createFromHexString(id);
}

export default toObjectId;
