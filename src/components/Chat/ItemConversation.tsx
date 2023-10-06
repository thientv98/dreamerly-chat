import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../store/conversationSlice";
import { Conversation, RootState, UserChat } from "../../types";

export type ItemConversationProps = {
  conversation: Conversation
}

const ItemConversation: React.FunctionComponent<ItemConversationProps> = ({ conversation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);

  const [user, setUser] = useState<UserChat | null>(null)
  const [seen, setSeen] = useState<number>(0)

  const openConversation = async (conversation: Conversation) => {
    dispatch(setConversation(conversation));
  }

  useEffect(() => {
    const userItem = conversation?.userData?.find(item => item.userId !== currentUser?.id)
    setUser(userItem || null)

    const seenList = (conversation?.seen || {})
    const seenAt = seenList[currentUser?.id || ''] || 0
    setSeen(seenAt)
  }, [conversation, currentUser])

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2" key={conversation.id}>
      {user?.name &&
        <button
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          onClick={() => openConversation(conversation)}
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full border overflow-hidden">
              <img
                src={user?.avatar}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            {onlineUsers.includes(user?.userId || '') && <span className="bottom-0 left-6 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>}
          </div>
          <div className="text-left m-w-80p">
            <div className="ml-2 text-sm font-semibold">
              {user?.name}
            </div>
            {conversation?.lastMessage?.content &&
              <div className={`ml-2 text-sm text-ellipsis ${seen < conversation.lastMessageTimestamp && conversation.lastMessage?.senderId === user?.userId ? 'font-semibold' : ''}`}>
                {currentUser?.id === conversation?.lastMessage?.senderId ? 'You: ' : user?.name + ': '}{conversation?.lastMessage?.content}
              </div>
            }
          </div>
        </button>
      }
    </div>
  )
}

export default ItemConversation;