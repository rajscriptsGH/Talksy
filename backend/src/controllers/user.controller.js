

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
        res.status(200).json({
            success: true,
            users: reccomendedUsers
        });
    } catch (error) {
        console.log("error in getReccomendedUsers", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export async function getMyFriends(req, res) { }