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
