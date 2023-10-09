import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListConversations } from "../../firebase/conversation";
import { setConversations } from "../../store/conversationSlice";
import { RootState } from "../../types";
import ItemConversation from "./ItemConversation";

const ListConversation: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const conversations = useSelector((state: RootState) => state.conversation.conversations);
  const users = useSelector((state: RootState) => state.user.users);
  const timestampConversations = useSelector((state: RootState) => state.conversation.timestampConversations);

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
    // eslint-disable-next-line
  }, [currentUser, timestampConversations, users])

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Conversations</span>
        <span
          className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
        >{conversations.length}</span>
      </div>
      {conversations.map((conversation) => (
        <ItemConversation conversation={conversation} key={conversation.id} />
      ))}
    </>
  )
}

export default ListConversation;