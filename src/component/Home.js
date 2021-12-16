import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import copyIcone from "../media/copy-icon.jpg";
import hideIcon from "../media/hide.jpg";
import showIcon from "../media/show.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home() {
    const [userData, setUserData] = useState([]);
    const [showToggle, setShowToggle] = useState(false)
    const token = useSelector((state) => state.token.token);
    const userName = useSelector((state) => state.token.user_name);

  useEffect(() => {
    const getUserData = async()=>{
        const response = await axios.get("http://localhost:5000/user-data",{
            headers: {
                authorization: `Bearer ${token}`,
              }  
        })
        setUserData(response.data)
        // console.log(response.data);
    }
    if(token){
      getUserData()
    }
  }, [token]);

  const changeToggle = ()=>{
    setShowToggle(!showToggle)
  }

  return (
    <div>
      {/* {console.log(token)}
      {console.log(userName)} */}
      {/* {console.log(userData)} */}
      {/* <button onClick={()=>{console.log(token)}}>token</button> */}
      {
        userData.user && <div className="user-data-container">
        <h2>{userData.user.fullName}</h2>
        {
          showToggle?
            <div>
              <h4>{userData.userCards[0].balance} SR</h4>
              <img onClick={()=>{changeToggle()}} className="show-hide-icons" src={hideIcon} alt="hide-icon" />
            </div>
            :
            <div>
              <h4>************* SR</h4>
              <img onClick={()=>{changeToggle()}} className="show-hide-icons" src={showIcon} alt="show-icon" />
            </div>
        }
        
        
        <br />
        <h4>SA{userData.userCards[0].ibanNumber}</h4>
        <img className="copy-icon" onClick={() => {navigator.clipboard.writeText(userData.userCards[0].ibanNumber)}} src={copyIcone} alt="copy-icon" />
      </div>
      }
      

      <div className="content-container">
        <Link className="content-links" to="/history-balance">
          <div className="content-item">History Balance</div>
        </Link>
        <Link className="content-links" to="/transfer-money">
          <div className="content-item">Transfer Money</div>
        </Link>
        <Link className="content-links" to="/update-data">
          <div className="content-item">Update Data</div>
        </Link>
        <Link className="content-links" to="/card">
          <div className="content-item">View Card</div>
        </Link>
        <Link className="content-links" to="/customer-service">
          <div className="content-item">Customer Service</div>
        </Link>
        <Link className="content-links" to="/payment">
          <div className="content-item">Online Payment</div>
        </Link>
      </div>
    </div>
  );
}
