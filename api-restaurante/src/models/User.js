import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

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
    select: false,
  },
  avatar: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    require: true,
  },
})

UserSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10)
  // this.email = await bcryptjs.hash(this.email, 10)
  next()
})

const User = mongoose.model("User", UserSchema)

export default User
