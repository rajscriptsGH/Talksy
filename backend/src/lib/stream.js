import { StreamChat } from 'stream-chat'
import "dotenv/config"
import User from '../models/User'

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.log("Steam api or secret missing")
}

const steamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertSteamUser = async (userData) => {
    try {
        await steamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error in upserting stream user", error);

    }
};

export const generateStreamToken = (UserId) => { }