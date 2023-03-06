import { PrismaClient } from "@prisma/client"
import { excludePswd, excludePswdEntities } from '../utils/excludePwd.js'

const prisma = new PrismaClient()

export default class EmailController {
  async getAll(req, res) {
    const emails = await prisma.email.findMany({})

    const emailsWOP = excludePswdEntities(emails, ['password'])

    return res.status(200).json(emailsWOP)
  }

  async getOne(req, res) {
    const { id } = req.params

    const emailFind = await prisma.email.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    const emailWOP = excludePswd(emailFind, ['password'])

    return res.status(201).json(emailWOP)
  }

  async create(req, res) {
    const { name, email, password } = req.body

    const emailFind = await prisma.email.findUnique({
      where: {
        email
      }
    })

    if (emailFind) {
      return res.status(400).json({
        error: "E-mail already exists."
      })
    }
    
    await prisma.email.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).json({
      msg: "E-mail created."
    })
  }

  async delete(req, res) {
    const { email } = req
    const { id } = req.params

    await prisma.email.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).send()
  }

  async update(req, res) {
    const { email: newEmail, name } = req.body
    const { email } = req

    await prisma.email.update({
      where: {
        email
      },
      data: {
        email: newEmail,
        name
      }
    })

    return res.status(200).json({
      msg: "Email updated"
    })
  }

  async updatePassword(req, res) {
    const { email } = req
    const { password } = req.body

    if (!password) {
      return res.status(403).json({
        error: "No password was provided."
      })
    }

    await prisma.email.update({
      where: {
        email
      },
      data: {
        password
      }
    })
    
    return res.status(200).send()
  }
}
