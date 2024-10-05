import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../public/logo.png';
import "@fontsource/roboto/400.css";  
import "@fontsource/roboto/700.css";  
import "@fontsource/montserrat/400.css";  
import "@fontsource/montserrat/700.css";  

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [showLinks, setShowLinks] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showProfileMenu, setShowProfileMenu] = useState(false); 
  const [user, setUser] = useState(null); 

  const userProfileImage = 'https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png'; 

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/stories', label: 'Stories' },
    { path: '/data-visualize', label: 'Asteroids' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    setShowLinks(false);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowLinks(true), 100); 
      return () => clearTimeout(timer);
    } else {
      setShowLinks(false); 
    }
  }, [isOpen]);

  // Effect to check local storage for user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData)); // Assuming user data is stored as a JSON string
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false); 
  };

  return (
    <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-1">
        <Link className="navbar-brand flex items-center" to="/">
          <img src={logo} className="w-24 h-auto object-cover pb-2" alt="NASA Logo" />
        </Link>

        <button
          className="block lg:hidden text-white focus:outline-none"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`hidden lg:flex items-center space-x-6`}>
          <ul className="flex space-x-6">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <Link
                  className={`nav-link relative group font-bold transition-all duration-300 ease-in-out py-2 px-4 font-montserrat ${
                    window.location.pathname === link.path ? 'text-blue-500' : 'text-white hover:text-blue-400'
                  }`}
                  to={link.path}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {link.label}
                  <span className={`absolute left-0 bottom-0 w-full h-1 bg-white transition-transform duration-300 ease-in-out 
                    ${window.location.pathname === link.path ? 'translate-y-1 scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <div className="relative">
              <img
                src={userProfileImage}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              />
              {showProfileMenu && (
                <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 w-48">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-full px-4 py-2 font-bold"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-black text-white shadow-lg">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>

            <ul className={`flex flex-col items-center justify-center h-full transition-opacity duration-300 ${showLinks ? 'opacity-100' : 'opacity-0'}`}>
              {navLinks.map((link, index) => (
                <li key={index} className={`nav-item transition-opacity duration-300 delay-${index * 100} mb-4`}>
                  <Link
                    className="font-bold text-lg hover:text-blue-400 py-4 px-6 font-montserrat"
                    to={link.path}
                    onClick={closeMenu}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <Link
                to="/signup"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-full px-4 py-2 font-bold"
                onClick={closeMenu}
              >
                Sign up
              </Link>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
