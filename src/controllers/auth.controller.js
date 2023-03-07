import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

import { compareHash } from "../utils/hashProvider.js"
import authConfig from '../config/auth.js'

const prisma = new PrismaClient()
const { sign } = jwt

export default class SessionController {
  async login(req, res) {
    const { user, password } = req.body
    

    const userAuth = await prisma.user.findUnique({
      where: {
        user
      }
    })

    const passwordMatch = await compareHash(password, userAuth.password)

    if (!passwordMatch) {
      return res.status(403).json({
        error: "The email/password provided are incorrect."
      })
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userAuth.id.toString(),
      expiresIn
    })

    return res.status(201).json({
      token
    })
  }
}
