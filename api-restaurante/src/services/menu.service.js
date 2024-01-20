import Menu from "../models/Menu.js";

const createService = (body) => Menu.create(body);

const findAllService = (skip, limit) => Menu.find().skip(skip).limit(limit).populate("restaurant");
const findByIdService = (id) => Menu.findById(id);

const countMenus = () => Menu.countDocuments();

export { createService, findAllService, findByIdService, countMenus };
