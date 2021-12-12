import React from 'react'
import "../styles/Home.css"
import copyIcone from "../media/copy-icon.jpg"
import hideIcon from "../media/hide.jpg"
import showIcon from "../media/show.jpg"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
    const token = useSelector((state)=>state.token.token)
    const userName = useSelector((state)=>state.token.user_name)
    return (
        <div>
            {console.log(token)}
            {console.log(userName)}
            <div className='user-data-container'>
                <h2>Full name</h2>
                <h4>Balance</h4> <img className='show-hide-icons' src={hideIcon} alt="hide-icon" /><img className='show-hide-icons' src={showIcon} alt="show-icon" />
                <br />
                <h4>IBAN Number</h4> <img className='copy-icon' src={copyIcone} alt="copy-icon" />
            </div>

            <div className='content-container'>
                <Link className='content-links' to="/history-balance">
                    <div className='content-item'>History Balance</div>
                </Link>
                <Link className='content-links' to="/transfer-money">
                    <div className='content-item'>Transfer Money</div>
                </Link>
                <Link className='content-links' to="/update-data">
                    <div className='content-item'>Update Data</div>
                </Link>
                <Link className='content-links' to="/card">
                    <div className='content-item'>View Card</div>
                </Link>
                <Link className='content-links' to="/customer-service">
                    <div className='content-item'>Customer Service</div>
                </Link>
                <Link className='content-links' to="/payment">
                    <div className='content-item'>Online Payment</div>
                </Link>
            </div>

        </div>
    )
}