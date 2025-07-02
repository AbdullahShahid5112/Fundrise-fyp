import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Chat";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage" 
import IdeaListPage from "./pages/IdeaListPage"
import LandingPage from "./pages/LandingPage";
import Pitches from "./pages/Pitches";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Investor from "./pages/Investor";
import AddIdeaPage from "./pages/AddIdeaPage";
import Chat from "./pages/Chat";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Protected Routes - require authentication */}
        <Route 
          path="/" 
          element={authUser ? <LandingPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chat" 
          element={authUser ? <Chat /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/pitches" 
          element={authUser ? <Pitches /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/addideapage" 
          element={authUser ? <AddIdeaPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/investors" 
          element={authUser ? <Investor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />} 
        />

        {/* Public Routes - redirect to home if authenticated */}
        <Route 
          path="/signup" 
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/login" 
          element={!authUser ? <LoginPage /> : <Navigate to="/" />} 
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;