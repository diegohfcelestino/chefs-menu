import {
  createService,
  findAllService,
  findByIdService,
} from "../services/restaurant.service.js";
const create = async (req, res) => {
  try {
    const { name, slogan, avatar, background, score, deliveryTime, deliveryValue, telephone, address, km } = req.body;

    if (!name || !slogan || !avatar || !background || !score || !deliveryTime || !deliveryValue || !telephone || !address || !km) {
      res
        .status(400)
        .send({ message: "Submeta todos os paramtros para salvar" });
    }

    await createService({
      name,
      slogan,
      avatar,
      background,
      score,
      deliveryTime,
      deliveryValue,
      telephone,
      address,
      km
    });
    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const findAll = async (req, res) => {
  try {
    const restaurants = await findAllService();

    if (restaurants.length === 0) {
      return res.status(400).send({ message: "Não há restaurantes cadastrados" });
    }

    res.send(restaurants);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { create, findAll };
