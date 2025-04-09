import express from 'express'
import { createUser, loginUser, isUserNameAvailable, getUser, getAllUsers } from '../controllers/user.controller.js'

const router = express.Router()


router.get('/getuser/:id', getUser)

router.get('/getallusers', getAllUsers)

router.post('/login', loginUser)

router.post('/signup', createUser)

router.post('/checkusername', isUserNameAvailable)

export default router