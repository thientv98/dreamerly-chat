import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListConversations } from "../../firebase/conversation";
import { setConversation, setConversations } from "../../store/conversationSlice";
import { Conversation, RootState } from "../../types";

const ListConversation: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const conversations = useSelector((state: RootState) => state.conversation.conversations);
  const users = useSelector((state: RootState) => state.user.users);
  const timestampConversations = useSelector((state: RootState) => state.conversation.timestampConversations);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);

  const openConversation = async (conversation: Conversation) => {
    dispatch(setConversation(conversation));
  }

  const fetchConversations = async () => {
    if (!currentUser?.id) return
    let data = await getListConversations(currentUser.id)

    data = data.map(item => ({
      ...item,
      userData: item.users.map(user => {
        const find = users.find(u => u.id === user);
        return {
          userId: user,
          email: find?.email, name: find?.name, avatar: find?.avatar
        }
      })
    }))

    dispatch(setConversations(data));
  }

  useEffect(() => {
    fetchConversations()
  }, [currentUser, timestampConversations])

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Conversations</span>
        <span
          className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
        >{conversations.length}</span>
      </div>
      {conversations.map((conversation) => (
        <div className="flex flex-col space-y-1 mt-4 -mx-2" key={conversation.id}>
          <button
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            onClick={() => openConversation(conversation)}
          >
            {conversation?.userData?.map((item, index) => {
              return (
                item.userId !== currentUser?.id ? <React.Fragment key={index}>
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full border overflow-hidden">
                      <img
                        src={item?.avatar}
                        alt="Avatar"
                        className="h-full w-full"
                      />
                    </div>
                    {onlineUsers.includes(item.userId) && <span className="bottom-0 left-6 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>}
                  </div>
                  <div className="text-left">
                    <div className="ml-2 text-sm font-semibold" key={`name-${index}`}>
                      {item.name}
                    </div>
                    <div className="ml-2 text-sm">
                      {currentUser?.id === conversation?.lastMessage?.senderId ? 'You: ' : item.name + ': '}{conversation?.lastMessage?.content}
                    </div>
                  </div>

                </React.Fragment> : ''
              )
            })}
          </button>
        </div>
      ))}
    </>
  )
}

export default ListConversation;