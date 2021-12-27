import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";


export default function Users() {
    const [users, setUsers] = useState([])

      const token = useSelector((state) => state.token.token);


    useEffect(() => {
        const getData= async()=>{
            const response = await axios.get("/users",{
                headers: {
                    authorization: `Bearer ${token}`,
                  },
            })

            setUsers(response.data)
            // console.log(response.data,"get method");
        }

        if(token){
            getData()
        }
    }, [token])

    const deleteUser = async(id)=>{
        try {
            // console.log(id,"id");
            
            const response = await axios.delete(`/remove-user/${id}`,{
                headers: {
                    authorization: `Bearer ${token}`,
                  },
            })

            // console.log(response.data,"after delete");

            setUsers(response.data)
            
        } catch (error) {
            console.log(error.response.data,"error");
        }
    }

    return (
        <div>
            {
                users && users.map((elem,index)=>{
                    return <div key={index}>
                        <p>
                            User Name: {elem.userName}
                        </p>
                        <p>
                            Full Name: {elem.fullName}
                        </p>
                        <p>
                            Nationality: {elem.nationality}
                        </p>
                        <p>
                            Date Of Birth: {elem.dateOfBirth}
                        </p>
                        <p>
                            National ID: {elem.nationalId}
                        </p>
                        {
                            elem.isAdmin? <p>Admin: {elem.isAdmin}</p> : <button onClick={()=>{deleteUser(elem._id)}}>Delete User</button>
                        }
                        <hr />
                    </div>
                })
            }
        </div>
    )
}
