import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer"
import NoChatSelected from "../components/NoChatSelected"
import DefaultLayout from "../components/layout/defaultLayout";
const Chat = () => {
  const { selectedUser } = useChatStore();
  console.log("Selected User:", selectedUser); 

  return (
    <div>
            <h1 className="mt-32">Chat app Loaded</h1> 

      <DefaultLayout >
      
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
      </DefaultLayout>
    </div>
  );
};
export default Chat;
