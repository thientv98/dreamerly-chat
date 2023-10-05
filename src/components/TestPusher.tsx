import Pusher from "pusher-js";
import { useEffect, useState } from "react";

const TestPusher = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [showErr] = useState("");
  const [channel, setChannel] = useState<any>("");

  useEffect(() => {
    const pusher = new Pusher("4a6b3605a5b7968dae2f", {
      cluster: "ap1",
      authEndpoint: 'https://pusher-auth-demo-c7a875f7f471.herokuapp.com/pusher/auth'
    });
    const c = pusher.subscribe("private-subscribe");
    c.bind("client-my-event", (data: any) => {
      console.log(111111, data);
    });
    setChannel(c)
    return () => {
      pusher.unsubscribe("private-subscribe");
    };
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (channel) {
      channel.trigger('client-my-event', { message: 123 });
    }
  };

  return (
    <div>
      <form className="inputContainer" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          className="inputElement"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="inputElement"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="inputBtn">
          Send
        </button>
        {showErr && <div className="errorText">Enter your message</div>}
      </form>
    </div>
  )
}
export default TestPusher;