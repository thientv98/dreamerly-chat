import { addDoc, collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { CONVERSATION_DOC } from "../config/const";
import { db } from "../config/firebase";
import { Conversation } from "../types";
import { generateSortedId } from "../utils";

export const createConversation = async (userId1: string, userId2: string) => {
  const data = await addDoc(collection(db, CONVERSATION_DOC), {
    users: [userId1, userId2],
    chatId: generateSortedId([userId1, userId2]),
    lastMessageTimestamp: 0
  });

  return data.id
}

export const getConversationByUser = async (userId1: string, userId2: string): Promise<Conversation | null> => {
  const sorted = generateSortedId([userId1, userId2])
  const q = query(
    collection(db, CONVERSATION_DOC),
    where("chatId", "==", sorted)
  );

  const conversations = await getDocs(q);
  return conversations.empty ? null : {
    ...conversations.docs[0].data() as Conversation,
    id: conversations.docs[0].id
  }
}

export const getListConversations = async (userId: string) => {
  console.log(123);
  const q = query(
    collection(db, CONVERSATION_DOC),
    orderBy("lastMessageTimestamp", "desc"),
    where("users", "array-contains", userId)
  )

  const conversations = await getDocs(q);
  console.log(conversations.metadata.fromCache, conversations.docs[0].data());


  return !conversations.empty ? conversations.docs.map(conversation => ({
    ...conversation.data() as Conversation,
    id: conversation.id
  })) : []
}