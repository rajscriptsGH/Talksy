import express from 'express'
import { middlewareAuthRoute } from '../middleware/auth.middleware.js'
import { getReccomendedUsers, getMyFriends } from '../controllers/user.controller.js'

const router = express.Router()

router.use(middlewareAuthRoute)

router.get("/", getReccomendedUsers)
router.get("/friends", getMyFriends)


router.get("/friend-request/:id", sendFriendRequest)



export default router;