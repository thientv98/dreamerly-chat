import { addDoc, collection, getDocs, orderBy, query } from "@firebase/firestore";
import dayjs from "dayjs";
import { CONVERSATION_DOC, MESSAGE_DOC } from "../config/const";
import { db } from "../config/firebase";
import { Message, MessageCreate } from "../types";

export const createMessage = async (conversationId: string, message: MessageCreate) => {
  addDoc(
    collection(db, CONVERSATION_DOC, conversationId, MESSAGE_DOC),
    {
      ...message,
      timestamp: dayjs().unix(),
    }
  );
}

export const getMessages = async (conversationId: string) => {
  const q = query(
    collection(db, CONVERSATION_DOC, conversationId, MESSAGE_DOC),
    orderBy("timestamp", 'desc')
  );
  const messages = await getDocs(q)
  return messages.docs.map(message => {
    return {
      ...message.data() as Message,
      id: message.id
    }
  })
}