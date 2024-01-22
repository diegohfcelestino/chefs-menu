import { createService, findAllService, updateService } from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Enviar todos os campos para cadastro" });
    }

    const user = await createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Erro ao criar usuário" });
    }

    res.status(201).send({
      user: {
        id: user._id,
        name,
        username,
        email,
        // password,
        avatar,
        background,
      },
      message: "Usuário criando com sucesso",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res
        .status(400)
        .send({ message: "Submeta pelo menos um capo para atualizar" });
    }
    const { id, user } = req;

    await updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

