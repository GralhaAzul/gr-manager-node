import jwt from 'jsonwebtoken'

import authConfig from '../config/auth.js'
const { verify } = jwt

export const ensureAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'JWT token is missing.'
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded

    req.user = {
      id: sub
    }

    next()
  } catch (error) {
    return res.status(401).json({
      error: "Invalid JWT token."
    })
  }
}
