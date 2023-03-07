import { Router } from 'express'

import userRoutes from './user.routes.js'
import emailRoutes from './emails.routes.js'
import sessionRoutes from './auth.routes.js'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated.js'

const routes = Router()

routes.use('/auth', sessionRoutes)
routes.use(ensureAuthenticate)
routes.use('/users', userRoutes)
routes.use('/emails', emailRoutes)


export default routes;
