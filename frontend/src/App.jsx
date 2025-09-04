import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Notification from './pages/Notification.jsx'
import OnBoarding from './pages/OnBoarding.jsx'
import CallPage from './pages/CallPage.jsx'
import toast, { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="h-screen">

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chatpage' element={<ChatPage />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/onboarding' element={<OnBoarding />} />
        <Route path='/callpage' element={<CallPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
