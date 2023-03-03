import { PrismaClient } from '@prisma/client'
import {} from 'node:crypto'
import { excludePswdFromUser, excludePswdFromUsers } from '../utils/excludeUserPwd.js'

const prisma = new PrismaClient()

export default class UserController {
  async getUsers(req, res) {
    const users = await prisma.user.findMany({})

    const usersWOPassword = excludePswdFromUsers(users, ['password'])

    res.json(usersWOPassword)
  }

  async getUser(req, res) {
    const { user } = req.params

    const userFind = await prisma.user.findUnique({
      where: {
        user
      }
    })

    if (!userFind) {
      return res.status(400).json({
        error: "User not found."
      })
    }

    const userWOPassword = excludePswdFromUser(userFind, ['password'])

    return res.status(200).json(userWOPassword)
  }

  async createUser(req, res) {
    const { name, user, password } = req.body

    const userExist = await prisma.user.findUnique({
      where: {
        user
      }
    })

    if (userExist) {
      return res.status(400).json({
        error: "User already exists."
      })
    }

    await prisma.user.create({
      data: {
        name,
        user,
        password
      }
    })

    return res.status(201).json({
      msg: `User ${user} has been created.`
    })
  }

  async updateUser(req, res) {
    const { user, name, newPassword } = req.body

    const userExist = await prisma.user.findUnique({
      where: {
        user
      }
    })

    if (!userExist) {
      return res.status(400).json({
        error: "User not found."
      })
    }

    await prisma.user.update({
      where: { user },
      data: {
        name,
        password: newPassword ? newPassword : user.password
      }
    })

    return res.status(203).json({
      msg: "User updated successfully!"
    })
  }

  async deleteUser(req, res) {
    const { user } = req.params;

    const userFind = await prisma.user.findUnique({
      where: {
        user
      }
    })

    if (!userFind) {
      return res.status(400).json({
        error: "User not found."
      })
    }

    await prisma.user.delete({
      where: {
        user
      }
    })

    return res.status(202).json({
      msg: "User deleted"
    })
  }
}
