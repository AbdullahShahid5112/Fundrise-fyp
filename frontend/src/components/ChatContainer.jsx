import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleten from "./skeletons/MessageSkeleten";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, UnsubscribeFromMessage } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);

            // ✅ Subscribe to real-time messages
            const unsubscribe = subscribeToMessage();

            return () => {
                if (unsubscribe) {
                    unsubscribe(); // ✅ Properly unsubscribe
                }
                UnsubscribeFromMessage(); // ✅ Unsubscribe when component unmounts
            };
        }
    }, [selectedUser?._id, getMessages, subscribeToMessage, UnsubscribeFromMessage]);

    useEffect(() => {
        const unsubscribe = subscribeToMessage(); // ✅ Subscribe when component mounts

        return () => {
            if (unsubscribe) {
                unsubscribe(); // ✅ Unsubscribe when component unmounts
            }
        };
    }, [subscribeToMessage]); // ✅ Only re-run when the function changes

    useEffect(() => {
        if (messageEndRef.current && messages.length) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleten />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-auto p-4 space-y-3">
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div 
                            key={msg._id || index} 
                            className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                            ref={index === messages.length - 1 ? messageEndRef : null}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img 
                                        src={msg.senderId === authUser._id 
                                            ? authUser.profilePic || "/avatar.png" 
                                            : selectedUser.profilePic || "/avatar.png"} 
                                        alt="Profile" 
                                    />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">
                                    {msg.createdAt 
                                        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                        : "No Timestamp"}
                                </time>
                            </div>
                            <div className="chat-bubble flex">
                                {msg.image && <img src={msg.image} alt="attachment" className="sm:max-w-[200px] rounded-md mb-2" />}
                                {msg.text && <p>{msg.text}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No messages yet.</p>
                )}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
