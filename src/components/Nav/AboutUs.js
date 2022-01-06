import React, { useState } from "react";
import "../../styles/About.css";
import Online from "../../media/oo.png";
import bank2 from "../../media/33.png";
import bank from "../../media/2.png";
import bank3 from "../../media/55.png";

export default function AboutUs() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="body-about-us">
      <div className="header"></div>

      <div className="cards-container">
        <div className="about-card">
          <img src={Online} className="left-img" alt="e" />
          <p>
            Founded in 1996, Alfaiadh Bank, Deeply rooted in Islamic banking
            principles, The Sharia compliant banking group is instrumental in
            bridging the gap between modern financial demands and Sharia
            intrinsic values, whilst spearheading numerous industry standards
            and development.
          </p>
        </div>
        <hr className="hr-about" />
        <div className="about-card">
          <p>
            Alfaiadh bank’s vision is to be a premier financial and banking
            service provider locally and regionally. The Bank’s effort to
            achieve these aspirations is reflected in achieving record annual
            profits.
          </p>
          <img src={bank} className="right-img" alt="e" />
        </div>
        <hr className="hr-about" />
        <div className="about-card">
          <img src={bank2} className="left-img" alt="e" />
          <p>
            With an established base in Hafer-albatin, Saudi Arabia, Al Radhi
            Bank has a vast network of over 100 branches, more than 500 ATM's,
            5,000 POS terminals installed with merchants and the largest
            customer base of any bank in the Kingdom, in addition to 70
            remittance centers across the kingdom. The first branch was opened
            in 1996.
          </p>
        </div>
        <hr className="hr-about" />
        <div className="about-card">
          <p>
            Plays a vital role in supporting economic transformation in Saudi
            Arabia by transforming the local banking sector and catalyzing the
            delivery of Saudi Arabia’s Vision 2030. Its strategy is closely
            aligned with the Vision’s programs.
          </p>
          <img src={bank3} className="right-img" alt="e" />
        </div>
        <hr className="hr-about" />
        <div className="google-map">
          {toggle ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27368.868341114012!2d41.01730140345901!3d30.967453025000342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x156c0dc453c5529b%3A0x857f510db855784c!2sAl%20Rajhi%20Bank!5e0!3m2!1sen!2ssa!4v1641045502895!5m2!1sen!2ssa"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          ) : (
            <button
              className="btn-google"
              onClick={() => {
                setToggle(true);
              }}
            >
              Our Location &darr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
