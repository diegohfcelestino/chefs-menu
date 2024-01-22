import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: true
  }
});

export const Menu = mongoose.model("Menu", MenuSchema);