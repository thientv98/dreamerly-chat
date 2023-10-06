import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../firebase/conversation";
import { createMessage, getMessages } from "../../firebase/message";
import { setConversation, setMessages, setTimestamp, setTimestampConversations } from "../../store/conversationSlice";
import { RootState } from "../../types";
import ConversationHeader from "./ConversationHeader";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";

const Conversation: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const conversation = useSelector((state: RootState) => state.conversation.conversation);
  const messages = useSelector((state: RootState) => state.conversation.messages);
  const timestamp = useSelector((state: RootState) => state.conversation.timestamp);
  const channel = useSelector((state: RootState) => state.conversation.channel);
  const [content, setContent] = useState("")

  const sendMessage = async () => {
    if (content) {
      const msg = content
      let conversationData = conversation
      if (!conversation.id) {
        let conversationId = await createConversation(conversation.users[0], currentUser?.id || "")
        conversationData = {
          ...conversation,
          id: conversationId
        }
        dispatch(setConversation(conversationData));
      }

      await createMessage(conversationData.id, {
        content: msg,
        senderId: currentUser?.id || "",
        type: "message"
      })
      setContent("")
      if (channel) {
        console.log(channel);
        channel.trigger(`client-conversation-${conversation.id}`, { message: content });
        channel.trigger(`client-conversations`, { message: content, conversation: conversation.id });
      }
      dispatch(setTimestamp(dayjs().unix()));
      // dispatch(setTimestampConversations(dayjs().unix()));
    }
  }

  const fetchMessages = async () => {
    if (conversation?.id) {
      const messages = await getMessages(conversation?.id, currentUser?.id || "")
      dispatch(setMessages(messages));

      if (messages.length > 0) {
        const el = document.querySelector(`#message-${messages[messages.length - 1].id}`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        dispatch(setTimestampConversations(dayjs().unix()));
      }
    } else {
      dispatch(setMessages([]));
    }
  }

  useEffect(() => {
    fetchMessages()
    setContent("")
  }, [conversation, timestamp])

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div
        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
      >
        {conversation ?
          <>
            <ConversationHeader conversation={conversation} />
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages.map(message => (
                    (message.senderId === currentUser?.id ?
                      <MessageRight message={message} conversation={conversation} key={message.id} /> :
                      <MessageLeft message={message} conversation={conversation} key={message.id} />
                    )
                  ))}
                </div>
              </div>
            </div>
            <div
              className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              <div>
                <button
                  className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                  />
                  <button
                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={sendMessage}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </>
          : <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            </div>
          </div>}
      </div>
    </div>
  )
}

export default Conversation;