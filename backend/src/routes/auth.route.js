
import express from 'express'
import { signup, login, logout, onboard } from '../controllers/auth.controlller.js';
import { middlewareAuthRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)


router.post("/onboarding", middlewareAuthRoute, onboard)

router.get("/me", middlewareAuthRoute, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
})



export default router;