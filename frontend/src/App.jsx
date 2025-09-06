import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from './pages/HomePage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Notification from './pages/Notification.jsx'
import OnBoarding from './pages/OnBoarding.jsx'
import CallPage from './pages/CallPage.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

function App() {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUserId"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry: false
  })

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error loading user</div>

  const authUser = authData?.user


  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/chatpage' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/notification' element={authUser ? <Notification /> : <Navigate to="/login" />} />
        <Route path='/onboarding' element={authUser ? <OnBoarding /> : <Navigate to="/login" />} />
        <Route path='/callpage' element={authUser ? <CallPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
