import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await api.get("/auth/check");
            
            if (res.data) {
                set({ authUser: res.data });
                get().connectSocket();
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
            
            // Only redirect to login if it's a 401 error
            if (error.response?.status === 401) {
                // Don't show error toast for 401 during auth check
                console.log("User not authenticated");
            } else {
                toast.error("Failed to verify authentication");
            }
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await api.post("/auth/signup", data);
            console.log("Signup Response:", res);

            if (res && res.data) {
                set({ authUser: res.data });
                toast.success("Account created successfully");
                get().connectSocket();
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
            console.log("Login Response:", res.data);

            if (res && res.data) {
                set({ authUser: res.data });
                toast.success("Login successful");
                get().connectSocket();
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            console.error("Logout Error:", error);
            // Still clear auth state even if logout request fails
            set({ authUser: null });
            get().disconnectSocket();
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });

        try {
            console.log("Updating profile with data:", data);
            const res = await api.put("/auth/update-profile", data);

            console.log("Updated Profile Response:", res.data);

            if (res.data) {
                set((state) => ({
                    authUser: { ...state.authUser, ...res.data }
                }));
                toast.success("Profile updated successfully");
            } else {
                throw new Error("Profile update failed");
            }
        } catch (error) {
            console.error("Profile Update Error:", error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });

        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    },
}));