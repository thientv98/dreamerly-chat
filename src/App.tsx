import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthRoute from './components/AuthRoute';
import useGetUserInfo from "./hooks/useGetUserInfo";
import useGetUserOnline from "./hooks/useGetUserOnline";
import usePusher from "./hooks/usePusher";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import { logout } from "./store/userSlice";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [loggedInUid, setLoggedInUid] = useState<string | null>(null);

  useGetUserInfo(loggedInUid)
  usePusher(loggedInUid)
  useGetUserOnline(loggedInUid)

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
