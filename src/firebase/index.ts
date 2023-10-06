import "firebase/messaging";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "../config/firebase";

const messaging = getMessaging(firebaseApp);

export const getMessagingToken = async () => {
  let currentToken = "";
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY });
      console.log("FCM registration token", currentToken);
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });