import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationByUser } from "../../firebase/conversation";
import { getAllUsers } from "../../firebase/user";
import { setConversation } from "../../store/conversationSlice";
import { setUsers } from "../../store/userSlice";
import { RootState } from "../../types";

const UserOnline: FC = () => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const openConversation = async (userId: string) => {
    let conversation = await getConversationByUser(currentUser?.id || "", userId);
    if (!conversation) {

      conversation = {
        id: "",
        users: [userId, (currentUser?.id || "")],
        lastMessageTimestamp: 0
      }
    }
    conversation.userData = conversation.users.map(user => {
      const find = onlineUsers.find(u => u.id === user);
      return {
        userId: user,
        email: find?.email, name: find?.name, avatar: find?.avatar
      }
    })
    dispatch(setConversation(conversation));
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers()
      dispatch(setUsers(users));
    }
    fetchAllUsers()
  }, [dispatch])

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Online</span>
        <span
          className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
        >4</span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 max-h-48 overflow-y-auto">
        {onlineUsers.map((user) => (
          user.id !== currentUser?.id && <button
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            key={user.id}
            onClick={() => { openConversation(user.id) }}
          >
            <div className="h-8 w-8 rounded-full border overflow-hidden">
              <img
                src={user?.avatar}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="ml-2 text-sm font-semibold">{user.name}</div>

            {/* <div
              className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
            >
              2
            </div> */}
          </button>
        ))}
      </div>
    </>
  )
}

export default UserOnline;