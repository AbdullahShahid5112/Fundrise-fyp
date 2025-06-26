import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar=()=>{
 
  
   const {logout,authUser}= useAuthStore();
   return (
  <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 bg-[#0d121c]/60">
    <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
      
     
      {/* Left Side - Logo */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
        <div className="w-40 h-40 rounded-lg bg-primary/10 flex items-center justify-center py-4">
          <img src="/logo-removebg.png" alt="main-logo"   />
        </div>
 
      </Link>

      {/* Right Side - Navigation */}
      <div className="flex items-center gap-4 text-white">
        <Link to="/chat" className="btn btn-sm gap-2 transition-colors">
  {/* <Settings className="size-4" /> */}
  <span className="hidden sm:inline">Chat</span>
</Link>
        <Link to="/" className="btn btn-sm gap-2 transition-colors">
          
          <span className="hidden sm:inline">HomePage</span>
        </Link>
             <Link to="/pitches" className="btn btn-sm gap-2 transition-colors">
          <span className="hidden sm:inline">Idea List</span>
        </Link>
        
             <Link to="/investors" className="btn btn-sm gap-2 transition-colors">
          <span className="hidden sm:inline">Investor List</span>
        </Link>
        
        
       
        {authUser ? (
          <>
            <Link to="/profile" className="btn btn-sm gap-2">
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            
            
            <button className="flex items-center gap-2 btn btn-sm" onClick={logout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm">Login</Link>

        )}
        
      </div>
    </div>
  </header>
);

};
export default Navbar