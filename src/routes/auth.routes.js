import { Router } from 'express'
import SessionController from '../controllers/auth.controller.js'

const router = new Router()
const sessionController = new SessionController()

router.post('/login', sessionController.login)

export default router
