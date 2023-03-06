import { Router } from 'express'
import userRoutes from './user.routes.js'
import emailRoutes from './emails.routes.js'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/emails', emailRoutes)

export default routes;
