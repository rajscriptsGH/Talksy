import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";


export async function getReccomendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;

        const currentUser = await User.findById(currentUserId).select("friends");
        const friendIds = currentUser?.friends || [];

        const excludeIds = [currentUserId, ...friendIds];

        const reccomendedUsers = await User.find({
            _id: { $nin: excludeIds },
            isOnboarded: true,
        });

        console.log("Exclude IDs:", excludeIds);
        console.log("Recommended Users:", reccomendedUsers);

        res.status(200).json(reccomendedUsers);
    } catch (error) {
        console.error("error in getReccomendedUsers", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}





export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");


        res.status(200).json({ friends: user.friends })
    } catch (error) {
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({ message: "Server error" })
    }
}


export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        //prevent sending req to urself
        if (myId === recipientId) {
            return res.status(400).json({ message: "U can't send request to yourself" })
        }

        const recipient = await User.findById(recipientId)

        if (!recipient) {
            return res.status(400).json({ message: "Recipient not found" })
        }

        //check if u both are already friend
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "U are already friends" })
        }

        //check if request already there
        const existingReq = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });

        if (existingReq) {
            return res.status(400).json({ message: "A request already exists between u both" })
        }

        //create a new request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })

        res.status(201).json({ friendRequest })

    } catch (error) {
        console.log("Error in sending friend request", error);
        res.status(500).json({ message: "Server error" })
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId)

        if (!friendRequest) {
            return res.status(404).json({ message: "Request not found" })
        }

        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "U can't accepts this request" })
        }

        friendRequest.status = "accepted"
        await friendRequest.save();


        //update each other friend list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        })

        return res.status(201).json({ message: "Request accepted" })

    } catch (error) {
        console.log("Error in accepting friend request", error);
        res.status(500).json({ message: "Server error" })
    }
}

//for notifications
export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.log("Error in getting notification", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOutgoingFriendReqs(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}