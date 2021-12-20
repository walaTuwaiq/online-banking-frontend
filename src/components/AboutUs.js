import React from 'react'
import "../styles/About.css"
import Online from "../media/oo.png"
import bank from "../media/1.png"
import bank2 from "../media/18503.png"

export default function AboutUs() {
    return (
        <div className='body-about-us'>
            <div className='header'></div>

            <div className='cards-container'>
                <div className='about-card'>
                    <img src={Online} alt="e" />
                    <p>
                    Founded in 1996, Alradhi Bank, Deeply rooted in Islamic banking principles, The Sharia compliant banking group is instrumental in bridging the gap between modern financial demands and Sharia intrinsic values, whilst spearheading numerous industry standards and development.
                    </p>
                </div>
                <div className='about-card'>
                <img src={bank} alt="e" />
                    <p>
                    Alradhi bank’s vision is to be a premier financial and banking service provider locally and regionally.
                    The Bank’s effort to achieve these aspirations is reflected in achieving record annual profits.
                    </p>
                </div>
                <div className='about-card'>
                <img src={bank2} alt="e" />
                    <p>
                    With an established base in Hafer-albatin, Saudi Arabia, Al Radhi Bank has a vast network of over 100 branches, more than 500 ATM's, 5,000 POS terminals installed with merchants and the largest customer base of any bank in the Kingdom, in addition to 70 remittance centers across the kingdom. The first branch was opened in 1996.
                    </p>
                </div>
                <div className='about-card'>
                <img src="https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-fresh-bank-card-machine-advertising-background-backgroundblue-backgroundmanmoneyhand-paintedatmsimplemachine-image_83842.jpg" alt="e" />
                    <p>
                    Plays a vital role in supporting economic transformation in Saudi Arabia by  transforming the local banking sector and catalyzing the delivery of Saudi Arabia’s Vision 2030. Its strategy is closely aligned with the Vision’s programs.
                    </p>
                </div>
            </div>
        </div>
    )
}
