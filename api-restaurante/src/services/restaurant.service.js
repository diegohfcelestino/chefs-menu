import Restaurant from "../models/Restaurant.js";

const createService = (body) => Restaurant.create(body);

const findAllService = () => Restaurant.find().sort({ km: 1 });
const findByIdService = (id) => Restaurant.findById(id);

export { createService, findAllService, findByIdService };
