import { FC } from "react";
import ChatHeader from "./ChatHeader";
import Conversation from "./Conversation";
import ListConversation from "./ListConversation";
import UserOnline from "./UserOnline";

const ChatView: FC = () => {

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <ChatHeader />

          <div className="flex flex-col mt-8">
            <UserOnline />

            <ListConversation />
          </div>
        </div>
        <Conversation />
      </div>
    </div>
  );
};

export default ChatView;
