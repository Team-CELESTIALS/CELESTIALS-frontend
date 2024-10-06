import React from 'react';
import './Footer.css';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Using react-icons for icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="slogan">"Exploring the cosmos, one asteroid at a time."</p>

        <ul className="social-links">
          <li>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </li>
        </ul>

        <p>© 2024 NASA Space Apps | Solar System Tracker</p>
        <p>All rights reserved | Designed and Developed by Team Celestials</p>
      </div>
    </footer>
  );
};

export default Footer;
