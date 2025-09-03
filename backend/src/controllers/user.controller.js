import User from "../models/User.js";


export async function getReccomendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const reccomendedUsers = await User.find({
            $and: [

                { _id: { $ne: currentUserId } },
                { $id: { $ne: currentUser.friends } },
                { isOnBorded: true },
            ]
        })
        res.status(200).json({ reccomendedUsers });
    } catch (error) {
        console.log("error in getReccomendedUsers", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");


        res.status(200).json({friends: user.friends })
    } catch (error) {
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({ message: "Server error" })
    }
}

