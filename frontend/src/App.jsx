import { Route, Routes } from 'react-router'

import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ChatPage from './components/ChatPage.jsx'
import Notification from './components/Notification.jsx'
import OnBoarding from './components/OnBoarding.jsx'
import CallPage from './components/CallPage.jsx'

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
    </div>
  )
}

export default App
