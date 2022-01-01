import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../styles/Chat.css";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [messagesListAdmin, setMessagesListAdmin] = useState([]);
  const [messageListUser, setMessageListUser] = useState([]);
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.token.token);
  const user_name = useSelector((state) => state.token.user_name);
  const user_id = useSelector((state) => state.token.user_id);

  const { id } = useParams();

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: id,
        author: user_name,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        // userId:user_id
      };
      socket.emit("send_message", messageData);
      // console.log(messageData,"messageData");
      setMessagesListAdmin([...messagesListAdmin, messageData]);
      setMessage("");

      const response = await axios.post(
        "/send-message-admin-chat",
        {
          userId: user_id,
          message,
          author: user_name,
          to: id,
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
      // console.log(response.data,"response");
    }
  };

  socket.on("receive_message", (data) => {
    console.log(data, "data");
    setMessageListUser([...messageListUser, data]);
  });

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`/chat-messages-admin/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setMessagesListAdmin(response.data.adminChats);
        setMessageListUser(response.data.userChats);
        // console.log(response.data,"responsee");
      }
    };

    if (token) {
      getMessages();
    }
  }, [token]);

  return (
    <div className="container-chat">
      <div className="header-chat">
        <p>LIVE CHAT:</p>
      </div>
      <div className="body-chat">
        <ScrollToBottom className="scroll-container">
          {messageListUser &&
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
            })}
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
          SEND
        </button>
      </div>
    </div>
  );
}
