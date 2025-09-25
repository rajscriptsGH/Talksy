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
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { theme } = useThemeStore()
  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />




  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path='/signup'
          element={!isAuthenticated ? <Signup /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route
          path='/login'
          element={!isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route path='/chatpage/:id'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route path='/notifications'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <Notification />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/login" : "/onboarding"} />
          )} />

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
