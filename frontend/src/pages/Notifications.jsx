import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUnreadMessageCount } from "../features/ui/UISlice";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Notifications = ({ children }) => {
  const { user, access } = useSelector((state) => state.auth);

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { readyState } = useWebSocket(
    user ? `ws://127.0.0.1:8000/notifications/` : null,
    {
      queryParams: {
        token: user ? access?.access : "",
      },
      onOpen: () => {},
      onClose: () => {},
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "unread_count":
            console.log("unread messages is excuting....");
            break;
          case "new_message_notification":
            console.log("this is block is now running");
            setUnreadMessageCount((count) => (count += 1));
            break;
          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return <div>{children}</div>;
};

export default Notifications;
