import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import toast, { LoaderIcon } from 'react-hot-toast';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from '../lib/api';
import { Camera, FileVideoCamera, MapPinIcon, Shuffle } from "lucide-react";
import { LANGUAGES } from "../constant/index.js";
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
    const { authUser } = useAuthUser()
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || "",
    });

    const { mutate: onboardingMutation, isPending, error } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Onboarded successfully")
            queryClient.invalidateQueries(["authUser"]);
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onboardingMutation(formState)
    }


    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        setFormState({ ...formState, profilePic: randomAvatar });
        toast.success("Profile changed successfully!");
    };



    return (
        <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
            <div className='card bg-base-300 w-full max-w-3xl shadow-xl'>
                <div className='card-body p-6 sm:p-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
                        Onboard your Profile
                    </h1>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='flex flex-col justify-start  space-y-4'>

                            {/* profile and avatar */}
                            <div className='flex flex-col items-center justify-center space-y-3 '>
                                {/* Profile card */}
                                <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                                    {formState.profilePic ? (
                                        <img
                                            src={formState.profilePic}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Camera className="size-12 text-base-content opacity-40" />
                                        </div>
                                    )}
                                </div>

                                {/* Generate Random Avatar BTN */}
                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={handleRandomAvatar} className="btn  bg-purple-600 hover:bg-purple-700 text-white">
                                        <Shuffle className="size-4 mr-2" />
                                        Generate Random Avatar
                                    </button>
                                </div>
                            </div>

                            {/* Full name input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formState.fullName}
                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                    className="input bg-slate-950 border border-purple-500 rounded-md py-2 outline-0 w-full px-3"
                                    placeholder="Full Name"
                                />
                            </div>

                            {/* BIO */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bio</span>
                                </label>
                                <textarea
                                    name="bio"
                                    value={formState.bio}
                                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                    className="border bg-slate-950 border-purple-500 rounded-md  py-4 outline-0 w-full px-3"
                                    placeholder="Write about yourself, language & location"
                                />
                            </div>

                            {/* language */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Native language */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Native Language</span>
                                    </label>
                                    <select
                                        name="nativeLanguage"
                                        value={formState.nativeLanguage}
                                        onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                        className="select bg-slate-950 border border-purple-600 w-full"
                                    >
                                        <option value="">Select your native language</option>
                                        {LANGUAGES.map((lang) => (
                                            <option key={`native-${lang}`} value={lang.toLowerCase()}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* learning language */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Learning Language</span>
                                    </label>
                                    <select
                                        name="learningLanguage"
                                        value={formState.learningLanguage}
                                        onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                        className="select bg-slate-950 border border-purple-500 w-full"
                                    >
                                        <option value="">Select language you're learning</option>
                                        {LANGUAGES.map((lang) => (
                                            <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            {/* LOCATION */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <div className="relative">
                                    <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formState.location}
                                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                                        className="bg-slate-950 border border-purple-500 rounded-md py-2 outline-0 w-full px-10"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>


                            {/* SUBMIT BUTTON */}
                            <button className="btn bg-purple-600 hover:bg-purple-700 w-full mt-2" disabled={isPending} type="submit">
                                {!isPending ? (
                                    <>
                                        <FileVideoCamera className="size-5 mr-2" />
                                        Complete Onboarding
                                    </>
                                ) : (
                                    <>
                                        <LoaderIcon className="animate-spin size-5 mr-2" />
                                        Onboarding...
                                    </>
                                )}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OnBoarding
