import { Conversation, Message } from "../../types";

interface MessageLeftProps {
  message: Message,
  conversation: Conversation
}
const MessageLeft: React.FunctionComponent<MessageLeftProps> = ({ message, conversation }) => {
  const user = conversation?.userData?.find(user => user.userId === message.senderId)
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div
          className="h-10 w-10 rounded-full border overflow-hidden flex-shrink-0"
        >
          <img
            src={user?.avatar}
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div
          className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
        >
          <div>{message.content}</div>
        </div>
      </div>
    </div>
  )
}

export default MessageLeft;