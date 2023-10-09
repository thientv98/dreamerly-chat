import { Conversation, Message } from "../../types";

interface MessageRightProps {
  message: Message
  conversation: Conversation
}
const MessageRight: React.FunctionComponent<MessageRightProps> = ({ message, conversation }) => {
  const user = conversation?.userData?.find(user => user.userId === message.senderId)
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg" id={`message-${message.id}`}>
      <div className="flex items-center justify-start flex-row-reverse">
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
          className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl message-content"
        >
          <div>{message.content}</div>
        </div>
      </div>
    </div>
  )
}

export default MessageRight;