// import axios from 'axios'
// import React, { useState } from "react";
// import { useSelector } from "react-redux";



// export default function DepositMoney() {

//     const [inputAmount, setInputAmount] = useState(0)
//     const token = useSelector((state) => state.token.token);

//     const amountInput = (e)=>{
//         setInputAmount(e.target.value)
//     }

//     const addBalance= async()=>{
//         const response = await axios.post("http://localhost:5000/add-balance",{
//             newBalance: Number(inputAmount)
//         },{
//             headers: {
//                 authorization: `Bearer ${token}`,
//               },
//         })
//         console.log(response.data);
//     }
//     return (
//         <div>
//             <div>
//                 <input onChange={amountInput} type="number" placeholder='amount'/>
//                 <button onClick={()=>{addBalance()}}>ADD</button>
//             </div>
//         </div>
//     )
// }
