import bcryptjs from "bcryptjs"
const { hash, compare } = bcryptjs

export const generateHash = (payload) => {
  return hash(payload, 8)
}

export const compareHash = (payload, hashed) => {
  return compare(payload, hashed)
}
