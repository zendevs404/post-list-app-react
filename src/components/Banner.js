// src/components/Banner.js
import React, { useState, useEffect } from 'react';
import './Banner.css';
import bannerImage from '../assets/handwriting-paper-pen-ink-used-generated-by-ai.jpg'; 

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="banner"
      style={{ 
        backgroundImage: `url(${bannerImage})`, 
        backgroundPositionY: -scrollY * 0.3        
      }}
    >
      <div className="banner-content">
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
    </div>
  );
};

export default Banner;
