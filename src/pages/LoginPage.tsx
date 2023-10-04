import dayjs from "dayjs";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { getUserById, setUserById } from '../firebase/user';
import useGetUserInfo from '../hooks/useGetUserInfo';

export interface ILoginPageProps { }

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const [loggedInUid, setLoggedInUid] = useState<string | null>(null);
  useGetUserInfo(loggedInUid);

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const { displayName, email, photoURL, uid } = response.user;

        const user = await getUserById(uid)
        if (!user) {
          await setUserById(uid, {
            email: email || "",
            name: displayName || "",
            avatar: photoURL || "",
            lastActive: dayjs().unix(),
            unreadNotifications: []
          })
        }
        setLoggedInUid(uid)
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signInWithGoogle()} disabled={authing}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
