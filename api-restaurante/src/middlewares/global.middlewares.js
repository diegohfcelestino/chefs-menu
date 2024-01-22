import mongoose from "mongoose";
import { findByIdService } from "../services/user.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ message: "Id do usuário é inválido" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findByIdService(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

