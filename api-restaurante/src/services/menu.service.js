import Menu from "../models/Menu.js";

const createService = (body) => Menu.create(body);
const findAllService = (skip, limit) => Menu.find().skip(skip).limit(limit).populate("restaurant");
const countMenus = () => Menu.countDocuments();
const findByIdService = (idRestaurant) => Menu.find({ restaurant: idRestaurant }).populate("restaurant");
// const findByIdService = (idRestaurant) => Menu.find().where({ restaurant: idRestaurant }).populate("restaurant");
const countMenusById = (idRestaurant) => Menu.countDocuments().where({ restaurant: idRestaurant });

export { createService, findAllService, findByIdService, countMenus, countMenusById };
