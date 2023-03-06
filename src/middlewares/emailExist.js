import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkEmailExist (req, res, next) {
  const { email } = req.headers

  const emailExist = await prisma.email.findUnique({
    where: {
      email
    }
  })

  if (!emailExist) {
    return res.status(404).json({
      error: "Email not found."
    })
  }

  req.email = email

  next()
}
