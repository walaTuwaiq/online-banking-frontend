import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/Currency.css";

export default function Currency() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://api.exchangeratesapi.io/v1/latest?access_key=8f926a6058a494915c96a5d9553ffa71"
      );
      setExchangeRates(response.data);
      let keysArr = [];
      let valuesArr = [];
      for (let x in response.data.rates) {
        keysArr.push(x);
        valuesArr.push(response.data.rates[x]);
      }
      setKeys(keysArr);
      setValues(valuesArr);
    };

    if (token) {
      getData();
    }
  }, [token]);

  return (
    <div>
      {exchangeRates && (
        <div className="header-currency">
          <h2>Base: {exchangeRates.base}</h2>
          <h3>At Date: {exchangeRates.date}</h3>
        </div>
      )}
      <div className="container-currency">
        <div>
          {keys &&
            keys.map((elem, index) => {
              return (
                <div key={index}>
                  <p className="key">{elem}</p>
                </div>
              );
            })}
        </div>

        <div>
          {values &&
            values.map((elem, index) => {
              return (
                <div key={index}>
                  <p>{elem}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
