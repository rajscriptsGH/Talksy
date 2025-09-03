import express from 'express'
import { middlewareAuthRoute } from '../middleware/auth.middleware.js'
import { getReccomendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest } from '../controllers/user.controller.js'

const router = express.Router()

router.use(middlewareAuthRoute)

router.get("/", getReccomendedUsers)
router.get("/friends", getMyFriends)


router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)



export default router;