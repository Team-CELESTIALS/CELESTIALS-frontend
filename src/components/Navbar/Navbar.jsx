import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../public/logo.png';
// Import Roboto font (with specific weights)
import "@fontsource/roboto/400.css";  // Regular
import "@fontsource/roboto/700.css";  // Bold

// Import Montserrat font (with specific weights)
import "@fontsource/montserrat/400.css";  // Regular
import "@fontsource/montserrat/700.css";  // Bold

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [showLinks, setShowLinks] = useState(false); // State to control link visibility

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/stories', label: 'Stories' },
<<<<<<< HEAD
    { path: '/data-visualize', label: 'Asteroids' },
    { path: '/team', label: 'Team' },
=======
    { path: '/data-visualize', label: 'Astroids' },
    // { path: '/team', label: 'Team' },
>>>>>>> origin/main
    { path: '/contact', label: 'Contact' },
  ];

  // Toggle the mobile menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu and reset link visibility
  const closeMenu = () => {
    setIsOpen(false);
    setShowLinks(false);
  };

  // Effect to show links after opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowLinks(true), 100); // Delay before showing links
      return () => clearTimeout(timer);
    } else {
      setShowLinks(false); // Hide links when menu is closed
    }
  }, [isOpen]);

  return (
    <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-1">
        {/* Logo section */}
        <Link className="navbar-brand flex items-center" to="/">
          <img src={logo} className="w-24 h-auto object-cover pb-2" alt="NASA Logo" /> {/* Adjusted size */}
        </Link>

        {/* Mobile menu button */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navbar links for larger screens */}
        <div className={`hidden lg:flex items-center space-x-6`}>
          <ul className="flex space-x-6">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <Link
                  className={`nav-link relative group font-bold transition-all duration-300 ease-in-out py-2 px-4 font-montserrat ${
                    window.location.pathname === link.path ? 'text-blue-500' : 'text-white hover:text-blue-400'
                  }`}
                  to={link.path}
                  style={{ fontFamily: 'Montserrat, sans-serif' }} // Using Montserrat for nav links
                >
                  {link.label}
                  <span className={`absolute left-0 bottom-0 w-full h-1 bg-white transition-transform duration-300 ease-in-out 
                    ${window.location.pathname === link.path ? 'translate-y-1 scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              </li>
            ))}
          </ul>
          {/* Sign up button */}
          <Link
            to="/signup"
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-full px-4 py-2 font-bold"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Sidebar for mobile menu */}
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

            {/* Links rendering with animation */}
            <ul className={`flex flex-col items-center justify-center h-full transition-opacity duration-300 ${showLinks ? 'opacity-100' : 'opacity-0'}`}>
              {navLinks.map((link, index) => (
                <li key={index} className={`nav-item transition-opacity duration-300 delay-${index * 100} mb-4`}> {/* Added margin-bottom */}
                  <Link
                    className="font-bold text-lg hover:text-blue-400 py-4 px-6 font-montserrat"
                    to={link.path}
                    onClick={closeMenu}
                    style={{ fontFamily: 'Montserrat, sans-serif' }} // Using Montserrat for mobile links
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Sign up button in mobile menu */}
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
