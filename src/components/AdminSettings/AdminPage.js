import React, { useState } from "react";
import Dashboard from "./Dashboard";
import AddMoney from "./AddMoney";
import "../../styles/AdminPage.css";
import Users from "./Users";
import Cards from "./Cards";
import AllChats from "./AllChats";

export default function AdminPage() {
  const [toggle, setToggle] = useState(1);
  const [dashActive, setDashActive] = useState(true);
  const [addMoneyActive, setAddMoneyActive] = useState(false);
  const [cardsActive, setCardsActive] = useState(false);
  const [usersActive, setUsersActive] = useState(false);
  const [allChatsActive, setAllChatsActive] = useState(false);

  const changeToggle = (n) => {
    setToggle(n);
    if (n == 1) {
      setDashActive(true);
      setAddMoneyActive(false);
      setCardsActive(false);
      setUsersActive(false);
      setAllChatsActive(false);
    } else if (n == 2) {
      setDashActive(false);
      setAddMoneyActive(true);
      setCardsActive(false);
      setUsersActive(false);
      setAllChatsActive(false);
    } else if (n == 3) {
      setDashActive(false);
      setAddMoneyActive(false);
      setCardsActive(true);
      setUsersActive(false);
      setAllChatsActive(false);
    } else if (n == 4) {
      setDashActive(false);
      setAddMoneyActive(false);
      setCardsActive(false);
      setUsersActive(true);
      setAllChatsActive(false);
    } else {
      setDashActive(false);
      setAddMoneyActive(false);
      setCardsActive(false);
      setUsersActive(false);
      setAllChatsActive(true);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar-admin">
        <p
          className={dashActive ? "link-sidebar active" : "link-sidebar"}
          onClick={() => {
            changeToggle(1);
          }}
        >
          Dashboard
        </p>
        <p
          className={addMoneyActive ? "link-sidebar active" : "link-sidebar"}
          onClick={() => {
            changeToggle(2);
          }}
        >
          Add Money
        </p>
        <p
          className={cardsActive ? "link-sidebar active" : "link-sidebar"}
          onClick={() => {
            changeToggle(3);
          }}
        >
          Cards
        </p>
        <p
          className={usersActive ? "link-sidebar active" : "link-sidebar"}
          onClick={() => {
            changeToggle(4);
          }}
        >
          Users
        </p>
        <p
          className={allChatsActive ? "link-sidebar active" : "link-sidebar"}
          onClick={() => {
            changeToggle(5);
          }}
        >
          Chats
        </p>
      </div>

      <div className="right-side-admin">
        {toggle == 1 ? (
          <div>
            <h3 className="header-dashbord">7 Days ago:</h3>
            <Dashboard />
          </div>
        ) : (
          ""
        )}
        {toggle == 2 && <AddMoney />}
        {toggle == 3 && <Cards />}
        {toggle == 4 && <Users />}
        {toggle == 5 && <AllChats />}
      </div>
    </div>
  );
}
