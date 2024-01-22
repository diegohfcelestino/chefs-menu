import { Restaurant } from "../models/Restaurant.js";

export const createService = (body) => Restaurant.create(body);
export const findAllService = () => Restaurant.find().sort({ km: 1 });
export const findByIdService = (id) => Restaurant.findById(id);
