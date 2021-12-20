import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import copyIcone from "../media/copy-icon.png";
import hideIcon from "../media/hide.png";
import showIcon from "../media/show.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [showToggle, setShowToggle] = useState(false);
  const [titleToggle, setTitleToggle] = useState("");
  const token = useSelector((state) => state.token.token);
  const isAdmin = useSelector((state) => state.token.user_admin);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5000/user-data", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      // console.log(response.data);
    };
    if (token) {
      getUserData();
    }
  }, [token]);

  const changeToggle = () => {
    setShowToggle(!showToggle);
  };

  const copiedIcon = () => {
    setTitleToggle("Copied!");
    setTimeout(() => {
      setTitleToggle("");
    }, 1300);
  };

  return (
    <div>
      {/* {console.log(token)}
      {console.log(userName)} */}
      {/* {console.log(userData)} */}
      {/* <button onClick={()=>{console.log(token)}}>token</button> */}
      {userData.user && (
        <div className="user-data-container">
          <h2>{userData.user.fullName}</h2>
          {showToggle ? (
            <div className="balance-container">
              <div className="balance">
                <h4>Your Balance: {userData.userCards[0].balance} SR</h4>
              </div>
              <div className="icon">
                <img
                  onClick={() => {
                    changeToggle();
                  }}
                  className="show-hide-icons"
                  src={hideIcon}
                  alt="hide-icon"
                />
              </div>
            </div>
          ) : (
            <div className="balance-container">
              <div className="balance">
                <h4>Your Balance: ************</h4>
              </div>
              <div className="icon">
                <img
                  onClick={() => {
                    changeToggle();
                  }}
                  className="show-hide-icons"
                  src={showIcon}
                  alt="show-icon"
                />
              </div>
            </div>
          )}

          <br />
          <div className="iban-container">
            <div className="iban-num">
              <h4>SA{userData.userCards[0].ibanNumber}</h4>
            </div>
            <div className="img">
              <img
                className="copy-icon"
                title="copy"
                onClick={() => {
                  copiedIcon();
                  navigator.clipboard.writeText(
                    `SA${userData.userCards[0].ibanNumber}`
                  );
                }}
                src={copyIcone}
                alt="copy-icon"
              />
            </div>
            <div className="msg">{titleToggle}</div>
          </div>

          <br />
        </div>
      )}

      <div className="content-container">
        <div className="content-item">
          <Link className="content-links" to="/history-balance">
            History Balance
          </Link>
        </div>
        <div className="content-item">
          <Link className="content-links" to="/transfer-money">
            Transfer Money
          </Link>
        </div>
        <div className="content-item">
          <Link className="content-links" to="/update-data">
            Update Data
          </Link>
        </div>
        <div className="content-item">
          <Link className="content-links" to="/card">
            View Card
          </Link>
        </div>
        <div className="content-item">
          <Link className="content-links" to="/customer-service">
            Customer Service
          </Link>
        </div>
        <div className="content-item">
          <Link className="content-links" to="/payment">
            Online Payment
          </Link>
        </div>
        {userData.user && userData.user.isAdmin ? (
          <div className="content-item">
            <Link className="content-links" to="/add-money">
              Add Money
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
