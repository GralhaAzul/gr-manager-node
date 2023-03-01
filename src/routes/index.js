import { Router } from 'express'

const routes = Router()

routes.use('/users', (req, res) => {
  res.send('Hello')
})

export default routes;
