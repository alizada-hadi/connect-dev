import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipants } from "../features/participants/participantsSlice";
import { Link, useParams } from "react-router-dom";
import TimeStamp from "../components/TimeStamp";

import { useHotkeys } from "react-hotkeys-hook";

const Conversations = () => {
  const dispatch = useDispatch();
  const { user, access } = useSelector((state) => state.auth);
  const { participants } = useSelector((state) => state.participants);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState({});
  const { conversationName } = useParams();
  const [meTyping, setMeTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const timeout = useRef();

  function updateTyping(user, typing) {
    if (user.typing === true) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }

  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/${conversationName}/` : null,
    {
      queryParams: {
        token: access ? access.access : "",
      },
      onOpen: () => {},
      onClose: () => {},
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "welcome_message":
            setWelcomeMessage(data.message);
            break;
          case "chat_message_echo":
            setMessageHistory((message) => message.concat(data.message));
            break;
          case "last_50_messages":
            setMessageHistory(data.messages);
            break;
          case "new_message_notification":
            console.log("new message received");
          case "typing":
            updateTyping(data);
            break;
          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const timeoutFunction = () => {
    setMeTyping(false);
    sendJsonMessage({ type: "typing", typing: false });
  };

  const onType = () => {
    if (meTyping === false) {
      setMeTyping(true);
      sendJsonMessage({ type: "typing", typing: true });
      timeout.current = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(timeoutFunction, 5000);
    }
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  // generate conversation name
  const createConversationName = (programmer) => {
    const name = [user?.username, programmer.first_name].sort();
    return `${name[0]}-${name[1]}`;
  };

  // message submit handler
  const messageSubmitHandler = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
    });
    setMessage("");
    clearTimeout(timeout.current);
    timeoutFunction();
  };

  useHotkeys("enter", () => {
    messageSubmitHandler();
  });

  const selectParticipantHandler = (programmer) => {
    setSelectedParticipant(programmer);
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    onType();
  };

  useEffect(() => {
    const token = access ? access.access : "";
    dispatch(fetchParticipants(token));
  }, [dispatch]);

  return (
    <div className="pt-12 mx-auto dark:bg-gray-800 min-h-screen">
      <div className="min-w-full rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-4 text-gray-600 text-xl">Chats</h2>
            <li>
              {participants?.map((parti, index) => (
                <Link
                  to={`/conversation/${createConversationName(
                    parti.programmer
                  )}`}
                  onClick={() => selectParticipantHandler(parti.programmer)}
                  key={index}
                  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                >
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={parti.programmer.avatar}
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {parti?.programmer?.first_name}{" "}
                        {parti?.programmer?.last_name}
                      </span>
                      {/* <span className="block ml-2 text-sm text-gray-600">
                        <TimeStamp timestamp={parti.last_message?.timestamp} />
                      </span> */}
                    </div>
                    {/* <span className="block ml-2 text-sm text-gray-600">
                      {parti.last_message?.content.substring(0, 20)}
                    </span> */}
                  </div>
                </Link>
              ))}
            </li>
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          {conversationName ? (
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={selectedParticipant?.avatar}
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">
                  {selectedParticipant?.first_name}{" "}
                  {selectedParticipant?.last_name}
                  <br />
                  <small>{typing && "typing..."}</small>
                </span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  {messageHistory.map((message, index) => (
                    <li
                      key={index}
                      className={
                        user.username === message?.from_user?.username
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={
                          user.username === message.from_user?.username
                            ? "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow bg-gray-200"
                            : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"
                        }
                      >
                        <span className="block">
                          {message.content}
                          <p>
                            <TimeStamp timestamp={message.timestamp} />
                          </p>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => messageChangeHandler(e)}
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  required
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button onClick={messageSubmitHandler}>
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center h-full">
              <button
                className="absolute border px-8 py-3 rounded-lg bg-green-200 top-[40%]"
                disabled
              >
                No Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
