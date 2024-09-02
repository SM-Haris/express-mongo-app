import express from 'express'
import authenticate from '../middlewares/Authentication'
import UserController from '../app/user/controller'

const PREFIX = '/user'
const router = express.Router()

router.get(`${PREFIX}/me`, authenticate, UserController.getUser)

export default router
