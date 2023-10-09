import Pusher from "pusher-js";
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setOnlineUsers } from "../store/userSlice";

const useGetUserOnline = (loggedInUid: string | null) => {
  const dispatch = useDispatch();
  const onlineRef = useRef<Array<string>>([]);

  useEffect(() => {
    if (!loggedInUid) return
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || "", {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER || "",
      authEndpoint: (process.env.REACT_APP_PUSHER_AUTH_ENDPOINT || "") + '?user_id=' + loggedInUid
    });
    const channelOnline = pusher.subscribe("presence-online");

    channelOnline.bind("pusher:subscription_succeeded", (members: any) => {
      const ids = Object.keys(members?.members)
      onlineRef.current = ids;
      dispatch(setOnlineUsers(onlineRef.current));
    });

    channelOnline.bind("pusher:member_removed", (member: any) => {
      const ids = onlineRef.current.filter(item => item !== member.id)
      onlineRef.current = ids
      dispatch(setOnlineUsers(onlineRef.current));
    });

    channelOnline.bind("pusher:member_added", (member: any) => {
      const find = onlineRef.current.findIndex(item => item === member.id)
      if (find === -1) {
        const online = [...onlineRef.current]
        online.push(member.id)
        onlineRef.current = online
        dispatch(setOnlineUsers(onlineRef.current));
      }
    });

    return () => {
      pusher.unsubscribe("presence-online");
    };
  }, [loggedInUid, dispatch])
};

export default useGetUserOnline;