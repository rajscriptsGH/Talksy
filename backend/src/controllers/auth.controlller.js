import User from "../models/User.js";

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

        


    } catch (error) {

    }
}
export function login(req, res) {
    res.send("login Route")
}
export function logout(req, res) {
    res.send("logout Route")
}