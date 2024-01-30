import { loginService, generateToken } from "../services/auth.service.js";
import { decryptString, encryptString } from "../helper/crypto.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(decryptString(email));

    if (!user) {
      return res
        .status(404)
        .send({ message: "Usuário ou senha não encontrado" });
    }

    if (decryptString(password) !== decryptString(user.password)) {
      return res
        .status(404)
        .send({ message: "Usuário ou senha não encontrados" });
    }

    const token = generateToken(user.id);

    const data = {
      token: token,
      id: user?._id,
      name: user?.name,
      username: user?.username,
      email: encryptString(user?.email),
      avatar: user?.avatar,
      background: user?.background,

    };

    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
