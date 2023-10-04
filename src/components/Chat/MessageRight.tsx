import { Conversation, Message } from "../../types";

interface MessageRightProps {
  message: Message
  conversation: Conversation
}
const MessageRight: React.FunctionComponent<MessageRightProps> = ({ message, conversation }) => {
  const user = conversation?.userData?.find(user => user.userId === message.senderId)
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
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
          className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
        >
          <div>{message.content}</div>
          {/* <div
            className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
          >
            Seen
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MessageRight;