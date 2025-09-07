import axios from "axios";
import { axiosInstance } from "./axios";


export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data
}

export const getAuthUser = async () => {
    const response = await axiosInstance.get("/auth/me")
    return response.data
}

export const completeOnboarding = async (userData) => {
    const response = await axios.post('/auth/onbording', userData)
    return response.data
}