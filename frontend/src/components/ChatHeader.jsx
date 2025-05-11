import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUser } = useAuthStore(); // Ensure it's always an array

  if (!selectedUser) return null; // Prevents crashes when no user is selected

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName || "User"} 
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName || "Unknown User"}</h3>
            <p className="text-sm text-base-content/70">
              {/* {onlineUser.includes(user._id) ? "Online" : "Offline"} */}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
