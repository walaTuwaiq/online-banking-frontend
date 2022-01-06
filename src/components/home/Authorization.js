import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Authorization() {
  const [ibanCards, setIbanCards] = useState([]);
  const [ibanInput, setIbanInput] = useState("");
  const [idToIban, setIdToIban] = useState(0);
  const [amount, setAmount] = useState(0);
  const [check, setCheck] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [ibanToggle, setIbanToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [authList, setAuthList] = useState([]);

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getIbans = async () => {
      const response = await axios.get("/iban-cards");
      setIbanCards(response.data);
    };

    const getAuth = async () => {
      const response = await axios.get("/authorizations-user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setAuthList(response.data);
      console.log(response.data, "response");
    };

    getIbans();

    if (token) {
      getAuth();
    }
  }, [token]);

  const findIbanBySearch = () => {
    const result = ibanCards.filter((elem) => {
      return elem.ibanNumber == ibanInput;
    });
    setResultSearch(result[0]);
  };

  const saveIdToIban = (id) => {
    setIdToIban(id);
    setIbanToggle(!toggle);
  };

  const saveInputs = () => {
    if (ibanInput !== "" && amount !== "") {
      setToggle(!toggle);
      setErrorMessage("");
    } else {
      setErrorMessage("Please Enter correct data");
    }
  };

  const saveData = async () => {
    if (check) {
      const response = await axios.post(
        "/authorizations",
        {
          to: idToIban,
          highestAmount: amount,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      setErrorMessage("Checked to complete!");
    }
  };

  return (
    <div>
      {toggle ? (
        <div>
          <p>
            You are want to create authorization to this IBAN: SA{ibanInput}
          </p>
          <p>Highest Amount: {amount}SR</p>
          <input
            className="checkbox-input"
            type="checkbox"
            onChange={(e) => {
              setCheck(e.target.checked);
            }}
          />{" "}
          Are You Sure?
          <button
            onClick={() => {
              saveData();
            }}
          >
            SAVE
          </button>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div>
          <label>Enter IBAN To Authorization: </label>{" "}
          <input
            onChange={(e) => {
              setIbanInput(e.target.value);
            }}
            type="text"
            placeholder="Iban Number"
          />
          <button
            onClick={() => {
              findIbanBySearch();
            }}
          >
            Search
          </button>
          {resultSearch && (
            <p
              onClick={() => {
                saveIdToIban(resultSearch._id);
              }}
            >
              {resultSearch.ibanNumber}
            </p>
          )}
          {ibanToggle && (
            <div>
              <label>Enter Highest Amount: </label>{" "}
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                placeholder="Highest Amount"
              />
              <button
                onClick={() => {
                  saveInputs();
                }}
              >
                Done
              </button>
            </div>
          )}
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
