import dayjs from "dayjs";
import Pusher from "pusher-js";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannel, setTimestamp, setTimestampConversations } from "../store/conversationSlice";
import { RootState } from "../types";

const usePusher = (loggedInUid: string | null) => {
  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.conversation.conversation);

  useEffect(() => {
    if (!loggedInUid) return
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || "", {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER || "",
      authEndpoint: (process.env.REACT_APP_PUSHER_AUTH_ENDPOINT || "") + '?user_id=' + loggedInUid
    });
    const channel = pusher.subscribe("private-message");

    channel.bind(`client-conversations`, (data: any) => {
      setTimeout(() => {
        dispatch(setTimestampConversations(dayjs().unix()));
      }, 100)
    });

    dispatch(setChannel(channel));
    if (conversation?.id) {
      channel.bind(`client-conversation-${conversation.id}`, (data: any) => {
        dispatch(setTimestamp(dayjs().unix()));
      });

      dispatch(setChannel(channel));
      return () => {
        pusher.unsubscribe("private-message");
      };
    }
  }, [conversation, loggedInUid, dispatch])
};

export default usePusher;