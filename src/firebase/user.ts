import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "@firebase/firestore"
import { USER_DOC } from "../config/const"
import { db } from "../config/firebase"
import { User, UserCreate } from "../types"

export const getUserById = async (userId: string) => {
  const docRef = doc(db, USER_DOC, userId)
  const docSnap = await getDoc(docRef)
  const user = docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null
  return {
    ...user,
    id: docSnap.id
  } as User
}

export const setUserById = async (userId: string, userData: UserCreate) => {
  const docRef = doc(db, USER_DOC, userId)
  await setDoc(docRef, userData);
}

export const getAllUsers = async () => {
  const users = await getDocs(collection(db, USER_DOC))
  return users.docs.map(user => {
    return {
      ...user.data() as User,
      id: user.id
    }
  })
}

export const updateUserToken = async (user: User, token: string) => {
  const tokenList = [...user?.tokens || []]

  if (!tokenList.includes(token)) {
    console.log(tokenList, token);
    tokenList.push(token)
    updateDoc(doc(db, USER_DOC, user.id), {
      tokens: tokenList
    });
  }
}