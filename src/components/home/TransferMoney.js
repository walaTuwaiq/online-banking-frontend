import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Receipt from "./Receipt";
import "../../styles/TransferMoney.css";

export default function TransferMoney() {
  const [toInput, setToInput] = useState("");
  const [amountInput, setAmountInput] = useState(0);
  const [ibanCards, setIbanCards] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [ibanNumber, setIbanNumber] = useState(0);
  const [currentUserBalance, setCurrentUserBalance] = useState(0);
  const [currentUserIban, setCurrentUserIban] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleToTransfer, setToggleToTransfer] = useState(false);

  const token = useSelector((state) => state.token.token);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    const getIbans = async () => {
      const response = await axios.get(`${process.env.URL}/iban-cards`);

      setIbanCards(response.data);
    };
    getIbans();
  }, []);

  const findIbanBySearch = () => {
    const result = ibanCards.filter((elem, index) => {
      return elem.ibanNumber == ibanNumber;
    });
    setResultSearch(result);
  };

  const saveToInput = (id) => {
    setToInput(id);
    setToggleToTransfer(true);
  };

  const submitTransaction = async () => {
    try {
      const response = await axios.post(
        `${process.env.URL}/transaction`,
        {
          to: toInput,
          amount: Number(amountInput),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setToggle(true);
        setCurrentUserBalance(Number(response.data.balance));
        setCurrentUserIban(Number(response.data.ibanNumber));
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <div className="add-money">
        {toggle ? (
          <Receipt
            toInput={toInput}
            amount={Number(amountInput)}
            ibanNumber={ibanNumber}
            currentUserBalance={currentUserBalance}
            currentUserIban={currentUserIban}
          />
        ) : (
          <div className="container-transfer">
            <h3>Current date is {date}</h3>
            <label>Enter Iban Number:</label>
            <input
              className="input-transfer"
              type="text"
              onChange={(e) => {
                setIbanNumber(e.target.value);
              }}
            />
            <button
              onClick={() => {
                findIbanBySearch();
              }}
            >
              Search
            </button>

            {resultSearch &&
              resultSearch.map((elem, index) => {
                return (
                  <div key={index}>
                    {elem.ibanNumber ? (
                      <p>
                        Click On iban if it's correct:
                        <p
                          className="iban-num"
                          onClick={() => {
                            saveToInput(elem._id);
                          }}
                        >
                          SA{elem.ibanNumber}
                        </p>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}

            {toggleToTransfer && (
              <div className="amount-div container-transfer">
                <label>The amount: </label>{" "}
                <input
                  className="input-transfer"
                  onChange={(e) => {
                    setAmountInput(e.target.value);
                  }}
                  type="number"
                  placeholder="amount"
                />
                <button
                  onClick={() => {
                    submitTransaction();
                  }}
                >
                  Transfer
                </button>
              </div>
            )}

            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
