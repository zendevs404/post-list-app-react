// src/components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsScrolled(true);
      } else if (window.scrollY < lastScrollY) {
        setIsScrolled(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        {/* Logo di kiri */}
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>

        <nav>
          <ul>
            <li><a href="#home" className="menu-item">Home</a></li>
            <li><a href="#about" className="menu-item">About</a></li>
            <li><a href="#services" className="menu-item">Services</a></li>
            <li><a href="#contact" className="menu-item">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
