import {create} from "zustand";
// import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import api from "../api/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore= create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false, 

    isCheckingAuth:true,
    onlineUser:[],

    socket:null,

    checkAuth: async () => {
    try {
        const res = await api.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket()
    } catch (error) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
    } finally {
        set({ isCheckingAuth: false });
    }
},
signup: async (data) => {
    set({ isSigningUp: true });

    try {
        const res = await api.post("/auth/signup", data);
        console.log("Signup Response:", res); // Debugging

        if (res && res.data) {
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket()
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        toast.error(error.response?.data?.message || "Signup failed");
    } finally {
        set({ isSigningUp: false });
    }
},
login: async (data) => { 
    set({ isLoggingIn: true });

    try {
        const res = await api.post("/auth/login", data);

        // Ensure token is correctly extracted and stored
        const token = res.data?.token;
        if (token) {
            localStorage.setItem("token", token);
            console.log("Token stored:", token);
        } else {
            console.error("Token is missing in response:", res.data);
        }

        set({ authUser: res.data });
        toast.success("Login Successfully");

        get().connectSocket()
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
        set({ isLoggingIn: false });
    }
},


logout: async()=>{
    try {
        await api.post("/auth/logout");
        set({authUser:null})
        toast.success("logged out successfully");
        get().disconnectSocket();
    } catch (error) {
        toast.error(error.response.data.message);
    }
},
updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
        console.log("Updating profile with data:", data);
        const res = await api.put("/auth/updating-profile", data);

        console.log("Updated Profile Response:", res.data);

        if (res.data?.profilePic) {
            set((state) => ({ ...state, authUser: { ...state.authUser, profilePic: res.data.profilePic } }));
            toast.success("Profile Image Updated");
        } else {
            throw new Error("Profile picture update failed");
        }
    } catch (error) {
        console.error("Profile Not Updated:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
        
    } finally {
        set({ isUpdatingProfile: false });
    }
},

connectSocket:()=>{
    const {authUser}=get();
    if(!authUser ||get().socket?.connected ) return;
    const socket= io(BASE_URL,
        {query:{
            userId:authUser._id,
        }});
    
    socket.connect();

    set({socket:socket});

    socket.on("getOnlineUser", (userIds)=>{
        set({onlineUser:userIds})
    })// this functionality will be use in APP.jsx while import
},
disconnectSocket:()=>{
    if(get().socket?.connected){
        get().socket.disconnect()
    }
},

}));




