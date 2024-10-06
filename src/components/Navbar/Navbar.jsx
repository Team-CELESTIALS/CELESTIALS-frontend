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
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
    const [showProfileMenu, setShowProfileMenu] = useState(false); // State to control profile menu visibility
    const [user, setUser] = useState(null); // State for user data

    // Sample user profile image URL
    const userProfileImage = 'https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png'; 

    // Navigation links
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/stories', label: 'Stories' },
        { path: '/data-visualize', label: 'Asteroids' },
        { path: '/contact', label: 'Contact' },
    ];

    // Toggle the mobile menu
    const toggleMenu = () => setIsOpen((prev) => !prev);

    // Close menu and reset link visibility
    const closeMenu = () => {
        setIsOpen(false);
        setShowLinks(false);
        setShowProfileMenu(false); // Close profile menu when closing the main menu
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
        <nav className="custom-nav text-white fixed z-50 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-4 py-1">
                {/* Logo section */}
                <Link className="navbar-brand flex items-center" to="/">
                    <img src={logo} className="w-24 h-auto object-cover pb-2" alt="NASA Logo" />
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
                                    className={`nav-link relative group font-bold transition-all duration-100 ease-in-out py-2 px-4 font-montserrat ${window.location.pathname === link.path ? 'text-primary-light' : 'text-white hover:text-primary-dim'
                                        }`}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Profile button and dropdown for larger screens */}
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

            {/* Sidebar for mobile menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-black h-full w-full bg-opacity-75 z-40 lg:hidden">
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
                                <li key={index} className={`nav-item transition-opacity duration-300 delay-${index * 100} mb-4`}>
                                    <Link
                                        className="font-bold text-lg hover:text-blue-400 py-4 px-6 font-montserrat"
                                        to={link.path}
                                        onClick={closeMenu}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Sign up button for mobile menu */}
                        <Link
                            to="/signup"
                            className="mt-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded-full px-4 py-2 font-bold"
                            onClick={closeMenu}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
