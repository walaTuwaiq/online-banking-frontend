import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cards() {
    const [cards, setCards] = useState([])
    const [sumBalance, setSumBalance] = useState(0)
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const getCards = async () => {
        try {
            const response = await axios.get("/cards", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            if(response.status == 200){
                setCards(response.data)

                console.log(response.data[0].isAcitve,"isAcitveisAcitve");
                // const a = response.data[0].isAcitve
                // console.log(typeOf(a));

                console.log(response.data,"response");
                // get all cards with user data

                let cardsArray = response.data
                let balance = 0
                for(let i=0 ;i<cardsArray.length;i++){
                    balance += response.data[i].balance
                }
                setSumBalance(balance)
            }
        } catch (error) {
            console.log(error.response.data," error");
        }
    };

    if (token) {
      getCards();
    }
  }, [token]);
  return <div>

        <h3>Bank Liquidity:</h3>
        <h4>{sumBalance}SR</h4>

        <hr />
        <br />

        <div>
            {
                cards.map((elem,index)=>{
                    return <div key={index}>
                        <p>Iban number: SA{elem.ibanNumber}</p>
                        <p>Balance: {elem.balance}SR</p>
                        {
                          // console.log(elem,"isActive")
                        }
                        {
                          elem.isAcitve && <p>isActive: {elem.isActive.toString()}</p>
                        }
                        <p>Expired date: {elem.expiredDate.substr(0,10)}</p>
                        <hr />
                    </div>
                })
            }
        </div>

  </div>;
}
