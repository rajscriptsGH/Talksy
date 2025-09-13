
import React, { useState } from 'react'
import { FileVideoCamera } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../lib/api';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const { mutate: loginMutation, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(["authUser"], { user: data.user });
            navigate("/");
        },
    });


    const handleLogin = (e) => {
        e.preventDefault()
        loginMutation(loginData)
    }


    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="dracula">
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* Login form */}
                <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
                    {/* logo */}
                    <div className="mb-4 flex items-center justify-start gap-2">
                        <FileVideoCamera className="size-8 text-primary" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            Talksy
                        </span>
                    </div>

                    {/* form */}

                    {error && (
                        <div className='alert alert-error mb-4'>
                            <span>{error.response.data.message}</span>
                        </div>
                    )}

                    <div className='w-full px-5'>
                        <form onSubmit={handleLogin}>
                            <div className='mt-2 mb-5'>
                                <h1 className='text-[30px] font-semibold text-center'>Login</h1>
                            </div>

                            <div className='space-y-5'>
                                {/* Email */}
                                <div className='form-controll w-full'>
                                    <label className='label'>
                                        <span className='label-text text-white font-medium'>Email</span>
                                    </label> <br />
                                    <input
                                        type="email"
                                        placeholder='razz@gmail.com'
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, email: e.target.value })}
                                        required
                                        className='w-full border border-purple-300 rounded-lg px-5 py-2 outline-0'
                                    />
                                </div>
                                {/* Password */}
                                <div className='form-controll w-full'>
                                    <label className='label'>
                                        <span className='label-text text-white font-medium'>Password</span>
                                    </label> <br />
                                    <input
                                        type="password"
                                        placeholder='********'
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, password: e.target.value })}
                                        required
                                        className='w-full border border-purple-300 rounded-lg px-5 py-2 outline-0'
                                    />
                                    <p className='text-[10px] text-slate-400'>Password must be at least 4 characters long</p>
                                </div>
                            </div>

                            <button
                                className='btn btn-primary mt-7 mb-2 w-full bg-gradient-to-r from-primary to-secondary hover:to-primary' type='submit'>
                                {isPending ? (
                                    <>
                                        <span className='loading loading-spinner loading-xs'>
                                            Loading....
                                        </span>
                                    </>
                                ) : (
                                    "Login"
                                )}

                            </button>

                            <p className='text-center mt-2'>
                                Don't have an accout?
                                <Link
                                    to={"/signup"}
                                    className='text-orange-400 cursor-pointer hover:text-green-400 ml-2'>
                                    Create account
                                </Link>
                            </p>
                        </form>
                    </div>


                </div>
                {/* right side */}
                <div className="hidden lg:flex lg:flex-col w-full lg:w-1/2 bg-primary/10 items-center justify-center py-5 px-2">
                    <div className="max-w-md p-8">
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="/videocall.png" alt="Language connection illustration" className="w-full h-full" />
                        </div>
                    </div>
                    <div className="text-center space-y-3 mt-6">
                        <h2 className="text-2xl font-bold">Connect with people worldwide</h2>
                        <p className="opacity-70">
                            Make friends & practice conversations
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

