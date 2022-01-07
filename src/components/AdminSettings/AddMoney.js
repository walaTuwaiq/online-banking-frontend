import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/AdminPage.css";

export default function AddMoney() {
  const [id, setId] = useState("");
  const [amount, setAmount] = useState(0);

  const token = useSelector((state) => state.token.token);
  const history = useHistory();

  const saveIdInput = (e) => {
    setId(e.target.value);
  };

  const saveAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const addMoney = async () => {
    try {
      const response = await axios.post(
        `${process.env.URL}/add-balance`,
        {
          id,
          newBalance: Number(amount),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 201) {
        alert("sucessfully");
        history.push("/home");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="add-money">
      <h2>Add Money To Card:</h2>
      <label>Enter ID To Card:</label>{" "}
      <input onChange={saveIdInput} type="text" placeholder="ID CARD" />
      <label>Enter Amount:</label>{" "}
      <input onChange={saveAmountInput} type="number" placeholder="Amount" />
      <button
        onClick={() => {
          addMoney();
        }}
      >
        ADD
      </button>
    </div>
  );
}
