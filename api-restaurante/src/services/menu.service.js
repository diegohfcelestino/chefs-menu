import { Menu } from "../models/Menu.js";
import { Restaurant } from "../models/Restaurant.js";

export const createService = (body) => Menu.create(body);
export const findAllService = (skip, limit) => Menu.find().skip(skip).limit(limit).populate("restaurant");
export const countMenus = () => Menu.countDocuments();
export const findByIdRestaurantService = (idRestaurant) => Menu.find({ restaurant: idRestaurant }).populate("restaurant");
//export const findByIdService = (idRestaurant) => Menu.find().where({ restaurant: idRestaurant }).populate("restaurant");
export const findByIdService = (id) => Menu.find({ _id: id }).populate("restaurant");
export const countMenusById = (idRestaurant) => Menu.countDocuments().where({ restaurant: idRestaurant });

export const searchByTextService = async (text) => {
  const regex = new RegExp(text, "i");
  const menusFiltered = await Menu.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
    ]
  }).populate('restaurant');

  const conditions = {};
  conditions.name = { $regex: regex };

  const allMenusByRestaurant = await Menu.find()
    .populate({
      path: "restaurant",
      model: Restaurant,
      match: conditions
    });

  const menusFilteredByRestaurant = allMenusByRestaurant.filter(menu => menu.restaurant !== null);

  const result = {};
  // Adiciona as propriedades do primeiro objeto
  for (const key in menusFiltered) {
    if (menusFiltered.hasOwnProperty(key)) {
      result[key] = menusFiltered[key];
    }
  }
  // Adiciona as propriedades do segundo objeto se não existirem no resultado
  for (const key in menusFilteredByRestaurant) {
    if (menusFilteredByRestaurant.hasOwnProperty(key) && !result.hasOwnProperty(key)) {
      result[key] = menusFilteredByRestaurant[key];
    }
  }

  const response = Object.values(result);

  return response;
};

export const eraseService = (id) => Menu.findByIdAndDelete({ _id: id });
