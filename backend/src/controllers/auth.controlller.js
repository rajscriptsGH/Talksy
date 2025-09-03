import { upsertSteamUser } from "../lib/stream.js";
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

        try {
            await upsertSteamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error creating stream user", error);

        }

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


export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email or password incorrect"
            })
        }

        const isPasswordCorrect = await user.checkPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Email or password incorrect"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,  //in ms
            httpOnly: true,  //protect from attack
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({
            success: true,
            user
        })


    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({
            message: "Login server error"
        });
    }
}


export function logout(req, res) {
    res.clearCookie("jwt");
    res.status(201).json({
        success: true,
        message: "Logout successfully"
    })
}


export async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean),
            });
        }

        const updateUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
        }, { new: true });
        if (!updateUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Onboarding successfully",
            user: updateUser
        })

        //update stream user
        await upsertSteamUser({
            id: updateUser._id.toString(),
            name: updateUser.fullName,
            image: updateUser.profilePic || "",
        })

    } catch (error) {
        console.log("error in onboard", error);
        res.status(500).json({
            message: "Onboarding server error"
        })
    }
}