import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyA3S4eOd6Hd-DRjI9FKR1mPDJy_Vhv5Hyg",
  authDomain: "dreamerly-chat-b0c38.firebaseapp.com",
  projectId: "dreamerly-chat-b0c38",
  storageBucket: "dreamerly-chat-b0c38.appspot.com",
  messagingSenderId: "409815180161",
  appId: "1:409815180161:web:1af9cd014eeba28263fe80"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);