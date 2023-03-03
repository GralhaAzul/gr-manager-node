import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

const router = Router()
const userController = new UserController();

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:user', userController.getUser)
router.put('/', userController.updateUser)
router.delete('/:user', userController.deleteUser)

export default router
