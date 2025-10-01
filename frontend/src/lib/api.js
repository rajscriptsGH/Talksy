import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const { data } = await axiosInstance.post("/auth/signup", signupData);
    return data;
};

export const login = async (loginData) => {
    const { data } = await axiosInstance.post("/auth/login", loginData);
    return data;
};

export const logout = async () => {
    try {
        const { data } = await axiosInstance.post("/auth/logout");
        return data;
    } catch (error) {
        console.log("Error in logout", error);

        return null
    }
};

export const getAuthUser = async () => {
    try {
        const { data } = await axiosInstance.get("/auth/me");
        return data;
    } catch (error) {
        console.error("Error in getAuthUser", error);
        return null;
    }
};

export const completeOnboarding = async (userData) => {
    const { data } = await axiosInstance.post("/auth/onboarding", userData);
    return data;
};

export async function getUserFriends() {
    const response = await axiosInstance.get("/users/friends");
    const data = response.data;
    return Array.isArray(data) ? data : data.friends || [];
}


export async function getRecommendedUsers() {
    const response = await axiosInstance.get("/users");
    const data = response.data;
    return Array.isArray(data) ? data : data.users || [];
}


export async function getOutgoingFriendReqs() {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
}

export async function sendFriendRequest(recipientId) {
    const response = await axiosInstance.post(`/users/friend-request/${recipientId}`);
    return response.data;
}

export async function getFriendRequests() {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data;
}

export async function acceptFriendRequest(requestId) {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
}

export async function getStreamToken() {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}

