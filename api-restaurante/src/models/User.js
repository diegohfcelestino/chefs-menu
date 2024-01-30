import mongoose from "mongoose";
import { decryptString } from "../helper/crypto.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    require: true,
  },
});

// UserSchema.pre("save", async function (next) {
//   this.email = await decryptString(this.email);
//   // this.email = await bcryptjs.hash(this.email, 10)
//   next();
// });

export const User = mongoose.model("User", UserSchema);
