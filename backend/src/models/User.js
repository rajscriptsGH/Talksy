import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    bio: {
        type: String,
        default: ""
    },
    profilePin: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    onBoarded: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: ""
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true })