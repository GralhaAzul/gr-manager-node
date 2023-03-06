import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkUserExist (req, res, next) {
  const { user } = req.headers

  const userExist = await prisma.user.findUnique({
    where: {
      user
    }
  })

  if (!userExist) {
    return res.status(404).json({
      error: "User not found."
    })
  }

  req.user = user

  next()
}
