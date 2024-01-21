import Menu from "../models/Menu.js";

const createService = (body) => Menu.create(body);
const findAllService = (skip, limit) => Menu.find().skip(skip).limit(limit).populate("restaurant");
const countMenus = () => Menu.countDocuments();
const findByIdRestaurantService = (idRestaurant) => Menu.find({ restaurant: idRestaurant }).populate("restaurant");
// const findByIdService = (idRestaurant) => Menu.find().where({ restaurant: idRestaurant }).populate("restaurant");
const findByIdService = (id) => Menu.find({ _id: id }).populate("restaurant");
const countMenusById = (idRestaurant) => Menu.countDocuments().where({ restaurant: idRestaurant });
const searchByTextService = (text) => Menu.find({
  name: { $regex: `${text} || ""`, $options: "i" },
  description: { $regex: `${text} || ""`, $options: "i" },
}).sort().populate("restaurant");
const eraseService = (id) => Menu.findByIdAndDelete({ _id: id });
export { createService, findAllService, findByIdRestaurantService, findByIdService, countMenus, countMenusById, searchByTextService, eraseService };
