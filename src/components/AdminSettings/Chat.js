import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../styles/Chat.css";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  // const [messagesListAdmin, setMessagesListAdmin] = useState([]);
  // const [messageListUser, setMessageListUser] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  // const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.token.token);
  const user_name = useSelector((state) => state.token.user_name);
  const user_id = useSelector((state) => state.token.user_id);

  const { id } = useParams();

  const sendMessage = async () => {
    // const allMessages = [...messagesListAdmin,messageListUser]
    //   console.log(allMessages,"allMessages");
    if (message !== "") {
      const messageData = {
        room: id,
        author: user_name,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
      setAllMessages([...allMessages, messageData]);
      setMessage("");

      const response = await axios.post(
        "/send-message-admin-chat",
        {
          userId: id,
          message,
          author: user_name,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  socket.on("receive_message", (data) => {
    const updateArr = [...allMessages];
    updateArr.push(data);
    setAllMessages(updateArr);
  });

  useEffect(() => {
    socket.emit("join_room", id);
    const getMessages = async () => {
      const response = await axios.get(`/chat-messages-admin/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setAllMessages(response.data);
        // setMessagesListAdmin(response.data.adminChats);
        // setMessageListUser(response.data.userChats);
      }
    };

    if (token) {
      getMessages();
      // const allMessages = [...messagesListAdmin, ...messageListUser];
      // console.log(allMessages, "allMessages");

      // const sortingMessages = allMessages.time.sort((a,b)=>{
      //   return a-b
      // })
      // let sortingMessages = [];
      // for (let i = 1; i < allMessages.length; i++) {
      //   if (allMessages[i].time < allMessages[i - 1].time) {
      //     sortingMessages.push(allMessages[i]);
      //     console.log(sortingMessages[i], "sortingMessages");
      //   } else {
      //     sortingMessages.push(allMessages[i - 1]);
      //     // console.log(sortingMessages[i], "sortingMessages");
      //   }
      // }
      // console.log(sortingMessages, "sortingMessages");
    }
  }, [token]);

  return (
    <div className="container-chat">
      <div className="header-chat">
        <h3>LIVE CHAT:</h3>
      </div>
      <div className="body-chat">
        <ScrollToBottom className="scroll-container">
          {allMessages &&
            allMessages.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="message-container"
                  id={elem.author == user_name ? "you" : "other"}
                >
                  <p className="author-message">{elem.author}</p>
                  <p className="text-message">{elem.message}</p>
                  <p className="time-message">{elem.time}</p>
                  {/* <hr /> */}
                </div>
              );
            })}
          {/* {messageListUser &&
            messageListUser.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="message-container"
                  id={elem.author == user_name ? "you" : "other"}
                >
                  <div className="text-message">{elem.message}</div>
                  <div className="time-message">{elem.time}</div>
                  <div className="author-message">{elem.author}</div>
                </div>
              );
            })}
          {messagesListAdmin &&
            messagesListAdmin.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="message-container"
                  id={elem.author == user_name ? "you" : "other"}
                >
                  <div className="text-message">{elem.message}</div>
                  <div className="time-message">{elem.time}</div>
                  <div className="author-message">{elem.author}</div>
                </div>
              );
            })} */}
        </ScrollToBottom>
      </div>
      <div className="footer-chat">
        <input
          value={message}
          type="text"
          placeholder="write here..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          SEND &rarr;	
        </button>
      </div>
    </div>
  );
}
