import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
    const { data: friends, isLoading, isError } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    if (isLoading) return <p className="p-4">Loading friends...</p>;
    if (isError) return <p className="p-4 text-red-500">Failed to load friends.</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
            {friends?.length === 0 ? (
                <NoFriendsFound />
            ) : (
                <div className="grid gap-4">
                    {friends.map((friend) => (
                        <div
                            key={friend._id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-base-200 hover:bg-base-300 transition"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={friend.profilePic || "/default-avatar.png"}
                                    alt={friend.fullName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium">{friend.fullName}</span>
                            </div>
                            <button className="btn btn-sm btn-primary">
                                Chat
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FriendsPage;
