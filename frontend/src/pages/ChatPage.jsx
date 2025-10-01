import React, { useState } from 'react'
import { useParams } from "react-router"
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from '../lib/api.js'

import {
    Channel,
    ChannelHeader,
    Chat,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";

const ChatPage = () => {
    const { id: targetUserId } = useParams();

    const [chatClient, setChatClient] = useState(null)
    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)

    const { authUser } = useAuthUser()

    const { data: token, isLoading: tokenLoading } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser, // only run if user is logged in
    });


    return (
        <div>
            Chat
        </div>
    )
}

export default ChatPage
