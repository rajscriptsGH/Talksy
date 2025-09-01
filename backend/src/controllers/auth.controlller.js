import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400), json({
                message: "All fields are requires"
            })
        }

        if (password.length < 4) {
            return res.status(400), json({
                message: "Password length must be atleast 4 characters"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400), json({
                message: "Invalid email"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomProfile = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomProfile,
        });

        const token = jwt.sign({
            userId: newUser._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,  //in ms
            httpOnly: true,  //protect from attack
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(201).json({
            success: true,
            user: newUser
        })

    } catch (error) {
        console.log("error in signup", error);
        res.status(500), json({
            message: "Signup server error"
        });
    }
}


export function login(req, res) {
    res.send("login Route")
}
export function logout(req, res) {
    res.send("logout Route")
}