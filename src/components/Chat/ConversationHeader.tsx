import { useSelector } from "react-redux";
import { Conversation, RootState } from "../../types";

interface ConversationHeaderProps {
  conversation: Conversation
}
const ConversationHeader: React.FunctionComponent<ConversationHeaderProps> = ({ conversation }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);
  const user = conversation?.userData?.find(user => user.userId !== currentUser?.id)

  return (
    <div className="relative flex items-center space-x-2 pb-3">
      <div className="relative">
        <div className="h-9 w-9 rounded-full border overflow-hidden">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        {onlineUsers.includes(user?.userId || "") && <span className="bottom-0 left-6 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>}
      </div>
      <div className="flex flex-col leading-tight">
        <div className="text-lg mt-1 flex items-center">
          <span className="text-gray-700 mr-3">{user?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default ConversationHeader;