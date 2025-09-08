import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from './pages/HomePage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Notification from './pages/Notification.jsx'
import OnBoarding from './pages/OnBoarding.jsx'
import CallPage from './pages/CallPage.jsx'
import { Toaster } from 'react-hot-toast'
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

function App() {

  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />




  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path='/chatpage' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/notification' element={isAuthenticated ? <Notification /> : <Navigate to="/login" />} />
        <Route path='/callpage' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route
          path='/onboarding'
          element={isAuthenticated ? (
            !isOnboarded ? (
              <OnBoarding />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to={"/login"} />
          )} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
