import bcryptjs from "bcryptjs"
import { loginService, generateToken } from "../services/auth.service.js"

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await loginService(email)

    if (!user) {
      return res
        .status(404)
        .send({ message: "Usuário ou senha não encontrado" })
    }

    const passwordIsValid = bcryptjs.compareSync(password, user.password)

    if (!passwordIsValid) {
      return res
        .status(404)
        .send({ message: "Usuário ou senha não encontrados" })
    }

    const token = generateToken(user.id)

    res.send({token})
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
export { login }
