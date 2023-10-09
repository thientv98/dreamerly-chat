import { doc, getDoc } from '@firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USER_DOC } from '../config/const';
import { db } from '../config/firebase';
import { getMessagingToken } from '../firebase';
import { updateUserToken } from '../firebase/user';
import { setUser } from '../store/userSlice';
import { User } from '../types';

const useGetUserInfo = (uid: string | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) return;

    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, USER_DOC, uid)
        const docSnap = await getDoc(docRef)
        const user = docSnap.exists() ? docSnap.data() : null

        if (user) {
          const userData = { ...user, id: docSnap.id } as User
          dispatch(setUser(userData));

          const token = await getMessagingToken()
          if (token) {
            updateUserToken(userData, token)
          }
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUserInfo();
  }, [uid, dispatch]);
};

export default useGetUserInfo;