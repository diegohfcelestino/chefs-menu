import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: String,
    require: true,
  },
  deliveryValue: {
    type: String,
    require: true,
  },
  telephone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  km: {
    type: Number,
    require: true
  }

});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);