import { Routes,Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
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

const App= ()=>{
  const {authUser,checkAuth,isCheckingAuth, onlineUser}=useAuthStore();

  console.log({ onlineUser});
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  console.log({authUser});

    if(isCheckingAuth && !authUser) return(
 <div className=" flex items-center justify-center h-screen">
 <Loader className="size-10 animate-spin " />
 </div>)


  return(
    
    <div>
    
      <Navbar />
      <Routes>
     
      <Route path="/" element={ authUser ? <HomePage /> :<Navigate to={"/login"} />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> :<Navigate to={"/"} />} />
      <Route path="/login" element={!authUser ? <LoginPage /> :<Navigate to={"/"} />} />
      {/* <Route path="/settings" element={ <SettingsPage /> } /> */}
      <Route path="/landingpage" element={ <LandingPage /> } />
      <Route path="/pitches" element={<Pitches/>} />
      <Route path="/profile" element={authUser ? <ProfilePage /> :<Navigate to={"/login"}/> } />
      
      </Routes>
      <Footer/>
      <Toaster />
    </div>
  );
};
export default App;