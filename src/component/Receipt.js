import React from 'react'

export default function Receipt(props) {
    return (
        <div>
            {
                console.log(props)
            }
            <h2>Completed successfully</h2>
            <div>
                <h4>
                Receipt to your transaction:
                </h4>
                <p>
                    Your iban is: SA{props.currentUserIban}
                </p>
                <p>
                TO: SA{props.ibanNumber}
                </p>
                <p>
                    Amount: {props.amount}SR
                </p>
                <p>
                    Current balance is: {props.currentUserBalance}SR
                </p>
            </div>
        </div>
    )
}
