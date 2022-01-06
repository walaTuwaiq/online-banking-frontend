import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AllChats() {
  const [chats, setChats] = useState([]);

  const history = useHistory();

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/chats-admin", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setChats(response.data);
      }
    };

    if (token) {
      getData();
    }
  }, [token]);

  const openChatWithUser = async (id) => {
    history.push(`/customer-service/${id}`);
  };

  return (
    <div>
      {chats &&
        chats.map((elem, index) => {
          return (
            <div key={index}>
              <p>{elem.room.fullName}</p>
              <p>{elem.room.userName}</p>
              <button
                className="btn-users"
                onClick={() => {
                  openChatWithUser(elem.room._id);
                }}
              >
                Chat
              </button>
              <hr />
            </div>
          );
        })}
    </div>
  );
}
