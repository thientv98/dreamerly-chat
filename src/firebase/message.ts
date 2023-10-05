import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from "@firebase/firestore";
import dayjs from "dayjs";
import { CONVERSATION_DOC, MESSAGE_DOC } from "../config/const";
import { db } from "../config/firebase";
import { Message, MessageCreate } from "../types";

export const createMessage = async (conversationId: string, message: MessageCreate) => {
  const timestamp = dayjs().unix()
  const msg = await addDoc(
    collection(db, CONVERSATION_DOC, conversationId, MESSAGE_DOC),
    {
      ...message,
      timestamp: timestamp,
    }
  );

  updateDoc(doc(db, CONVERSATION_DOC, conversationId), {
    lastMessageTimestamp: timestamp,
    lastMessage: {
      id: msg.id,
      ...message,
      timestamp: timestamp
    }
  });
}

export const getMessages = async (conversationId: string) => {
  const q = query(
    collection(db, CONVERSATION_DOC, conversationId, MESSAGE_DOC),
    orderBy("timestamp", 'asc')
  );
  const messages = await getDocs(q)
  return messages.docs.map(message => {
    return {
      ...message.data() as Message,
      id: message.id
    }
  })
}