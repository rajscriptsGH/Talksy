import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import toast from 'react-hot-toast';
import { useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from '../lib/api';

const OnBoarding = () => {
    const { authUser } = useAuthUser()
    const queryClient = useQueryClient()

    const { formState, setFormState } = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLamguage: authUser?.nativeLamguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || "",
    });

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Onboarded successfully")

        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        onboardingMutation(formState)
    }






    return (
        <div>
            OnBoarding
        </div>
    )
}

export default OnBoarding
