import React, { useContext, useEffect, useState } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import { ShopContext } from '../../Context/ShopContext';

export const Hero = () => {
  const { getName } = useContext(ShopContext);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const name = await getName();
      setCustomerName(name);
    };

    fetchData();
  }, [getName]);

  return (
    <div className='hero'>
      <div className="hero-left">
        <div className="word-animation-container">
          <h1 className="word-animation">
            <span>Hello</span>
            <span>{customerName},</span>
            <span>Welcome</span>
            <span>to</span>
            <span>the</span>
            <span>Website</span>
          </h1>
        </div>
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collection</p>
          <p>For Everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};
