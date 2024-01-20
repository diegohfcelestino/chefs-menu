import {
  createService,
  findAllService,
  findByIdService,
  countMenus
} from "../services/menu.service.js";
const create = async (req, res) => {
  try {
    const { type, name, description, background, value, restaurant } = req.body;

    if (!type || !name || !description || !background || !value || !restaurant) {
      res
        .status(400)
        .send({ message: "Submeta todos os parametros para salvar" });
    }

    await createService({
      type,
      name,
      description,
      background,
      value,
      restaurant
    });
    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const findAll = async (req, res) => {
  try {
    let { limit, skip } = req.query;

    limit = Number(limit);
    skip = Number(skip);

    if (!limit) {
      limit = 100;
    }

    if (!skip) {
      skip = 0;
    }

    const menus = await findAllService(skip, limit);
    const total = await countMenus();
    const currentUrl = req.baseUrl;

    const next = skip + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&skip=${next}` : null;

    const previous = skip - limit < 0 ? null : skip - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&skip=${previous}` : null;

    if (menus.length === 0) {
      return res.status(400).send({ message: "Não há menus cadastrados" });
    }

    const menuGroup = menus.map((item) => ({
      id: item._id,
      type: item.type,
      name: item.name,
      description: item.description,
      background: item.background,
      value: item.value,
      idRestaurant: item.restaurant._id,
      nameRestaurant: item.restaurant.name,
      backgroundRestaurant: item.restaurant.background,
      avatarRestaurant: item.restaurant.avatar,
      scoreRestaurant: item.restaurant.score,
      telephoneRestaurant: item.restaurant.telephone,

    })).reduce((group, menu) => {
      const { type } = menu;
      group[type] = group[type] ?? [];
      group[type].push(menu);
      return group;
    }, {});



    const result = Object.keys(menuGroup).map(key => {
      return {
        title: key,
        data: menuGroup[key]
      };
    });

    res.send({
      nextUrl,
      previousUrl,
      limit,
      skip,
      total,
      result
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { create, findAll };
