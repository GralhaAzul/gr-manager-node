import { Router } from 'express'
import EmailController from '../controllers/email.controller.js'
import { checkEmailExist } from '../middlewares/emailExist.js'

const routes = Router()
const emailController = new EmailController()

routes.post('/', emailController.create)
routes.get('/', emailController.getAll)
routes.get('/:id', checkEmailExist, emailController.getOne)
routes.put('/', checkEmailExist, emailController.update)
routes.patch('/:id/password', checkEmailExist, emailController.updatePassword)
routes.delete('/:id', checkEmailExist, emailController.delete)

export default routes
