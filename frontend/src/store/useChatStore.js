import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { io } from "socket.io-client";

// ✅ Move socket outside the function for a single connection
const socket = io("http://localhost:5001", { withCredentials: true });

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    lastMessages: {}, // ✅ Store last messages for the sidebar
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    unreadMessages: {},

    // ✅ Fetch all users
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/user");
            console.log("API Response (Users):", res.data);
            set({ users: res.data, isUsersLoading: false });
        } catch (error) {
            console.error("Error fetching users:", error);
            set({ isUsersLoading: false });
        }
    },

    // ✅ Set selected user and reset messages
    setSelectedUser: (user) => {
        console.log("Selected user:", user);
        set({ selectedUser: user, messages: [] });

        // ✅ Join the selected user's chat room for real-time messages
        if (user?._id) {
            socket.emit("joinChat", user._id);
        }
    },

    // ✅ Fetch messages for a selected user
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            console.log("Fetched Messages:", res.data);
            set({ messages: Array.isArray(res.data) ? res.data : [] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
            console.error("Error fetching messages:", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // ✅ Send a new message and update sidebar
    sendMessage: async (messageData) => {
        const { selectedUser, messages, lastMessages } = get();
        if (!selectedUser) {
            toast.error("No user selected!");
            return;
        }

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            console.log("Message Sent:", res.data);
            
            set({
                messages: [...messages, res.data],
                lastMessages: { ...lastMessages, [selectedUser._id]: res.data.text } // ✅ Update last message
            });

            // ✅ Emit event to notify other users in the chat
            socket.emit("sendMessage", res.data);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    // ✅ Subscribe to real-time messages
    subscribeToMessage: () => {
        const { selectedUser, authUser } = get();
        if (!authUser?._id) return;

        console.log("🔵 Joining socket room:", authUser._id);
        socket.emit("joinRoom", authUser._id); // ✅ User joins their room

        socket.on("newMessage", (newMessage) => {
            console.log("📩 New message received:", newMessage);

            set((state) => {
                // ✅ If message is from the selected user, update the chat in real-time
                if (state.selectedUser && newMessage.senderId === state.selectedUser._id) {
                    return {
                        messages: [...state.messages, newMessage]
                    };
                }
                // ✅ Otherwise, update the last message for sidebar notifications
                return {
                    lastMessages: { ...state.lastMessages, [newMessage.senderId]: newMessage.text }
                };
            });
        });

        return () => {
            console.log("🔴 Unsubscribing from socket events...");
            socket.off("newMessage");
        };
    },

    // ✅ Unsubscribe from new messages
    UnsubscribeFromMessage: () => {
        console.log("🔴 Leaving socket room...");
        socket.off("newMessage");
    },
}));
