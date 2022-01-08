import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../../styles/Chat.css";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const socket = io.connect(process.env.REACT_APP_URL);

export default function Contact() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const user_id = useSelector((state) => state.token.user_id);
  const user_name = useSelector((state) => state.token.user_name);
  const token = useSelector((state) => state.token.token);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: user_id,
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

      await axios.post(
        `${process.env.REACT_APP_URL}/send-message-chat`,
        {
          userId: user_id,
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
    socket.emit("join_room", user_id);
    const getMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/chat-messages`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          if (response.data === "error") {
            setAllMessages([]);
          } else {
            setAllMessages(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getMessages();
    }
  }, [token]);

  return (
    <div className="container-chat">
      <div className="header-chat">
        <h3>We are here in 24 / 7</h3>
        <br />
        <h3>LIVE CHAT:</h3>
      </div>
      <div className="body-chat">
        {console.log(allMessages, "all")}
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
