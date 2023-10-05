import dayjs from "dayjs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthRoute from './components/AuthRoute';
import useGetUserInfo from "./hooks/useGetUserInfo";
import useGetUserOnline from "./hooks/useGetUserOnline";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import { setChannel, setTimestamp, setTimestampConversations } from "./store/conversationSlice";
import { logout } from "./store/userSlice";
import { RootState } from "./types";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.conversation.conversation);
  const [loggedInUid, setLoggedInUid] = useState<string | null>(null);

  useGetUserInfo(loggedInUid);
  useGetUserOnline(loggedInUid)

  useEffect(() => {
    if (!loggedInUid) return
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || "", {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER || "",
      authEndpoint: (process.env.REACT_APP_PUSHER_AUTH_ENDPOINT || "") + '?user_id=' + loggedInUid
    });
    const channel = pusher.subscribe("private-message");

    channel.bind(`client-conversations`, (data: any) => {
      console.log(222, data);
      dispatch(setTimestampConversations(dayjs().unix()));
    });

    dispatch(setChannel(channel));
    if (conversation?.id) {
      channel.bind(`client-conversation-${conversation.id}`, (data: any) => {
        console.log(111111, data);
        dispatch(setTimestamp(dayjs().unix()));
      });

      dispatch(setChannel(channel));
      return () => {
        pusher.unsubscribe("private-message");
      };
    }
  }, [conversation, loggedInUid])

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setLoggedInUid(user.uid)
      } else {
        dispatch(logout());
      }
    });

    return () => AuthCheck();
  }, [dispatch, auth]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <ChatPage />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
