import { doc, getDoc } from '@firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USER_DOC } from '../config/const';
import { db } from '../config/firebase';
import { setUser } from '../store/userSlice';

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
          dispatch(setUser({
            ...user,
            id: docSnap.id
          }));
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUserInfo();
  }, [uid, dispatch, db]);
};

export default useGetUserInfo;