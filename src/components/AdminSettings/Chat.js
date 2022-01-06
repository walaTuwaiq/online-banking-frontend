import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../styles/Chat.css";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [allMessages, setAllMessages] = useState([]);
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
        if (response.data === "error") {
          setAllMessages([]);
        }else {
          setAllMessages(response.data);
        }
      }
    };

    if (token) {
      getMessages();
    }
  }, [token]);

  return (
    <div className="container-chat">
      <div className="header-chat">
        <h3>LIVE CHAT:</h3>
      </div>
      <div className="body-chat">
        {/* {console.log(allMessages == true, "allMessages")} */}
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
          SEND &rarr;
        </button>
      </div>
    </div>
  );
}
