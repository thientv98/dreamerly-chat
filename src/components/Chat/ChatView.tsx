import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import ChatHeader from "./ChatHeader";
import Conversation from "./Conversation";
import ListConversation from "./ListConversation";
import UserOnline from "./UserOnline";

const ChatView: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      {currentUser &&
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 h-full w-full overflow-x-hidden">
          <div className="col-span-1 lg:col-span-2 py-8 pl-6 pr-2 w-full bg-white flex-shrink-0">
            <ChatHeader />

            <div className="flex flex-col mt-8">
              <UserOnline />

              <ListConversation />
            </div>
          </div>
          <Conversation />
        </div>
      }
    </div>
  );
};

export default ChatView;
