import React, { useState } from 'react'
import { FileVideoCamera } from 'lucide-react'

const Signup = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const handleSignup = (e) => {
        e.preventDefault()
    }


    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="dracula">
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* signup form */}
                <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
                    {/* logo */}
                    <div className="mb-4 flex items-center justify-start gap-2">
                        <FileVideoCamera className="size-8 text-primary" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            Talksy
                        </span>
                    </div>

                    {/* form */}
                    <div className='w-full px-5'>
                        <form onSubmit={handleSignup}>
                           
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Signup
