// import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false); // Scrolling down
            } else {
                setShowNavbar(true); // Scrolling up
            }
            lastScrollY = window.scrollY;
            setIsScrolled(window.scrollY > 50); // Background color on scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-transform duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} ${
                isScrolled ? 'bg-gray-900 bg-opacity-90 shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Logo Links to Home with Animation */}
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src={logo}
                            alt="Cocox Logo"
                            className="h-16 w-auto transform transition duration-300 ease-in-out hover:scale-110 hover:opacity-80"
                        />
                    </Link>
                </div>

                {/* Desktop Links with Conditional Text Color and Highlight on Contact */}
                <ul className={`hidden md:flex space-x-6 text-lg ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                    {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                        <li key={item} className="transition-transform duration-300 ease-in-out hover:scale-105">
                            <Link
                                to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                                className={`hover:text-green-500 transition duration-300 ease-in-out ${
                                    item === 'Contact' && !isScrolled ? 'border border-green-500 rounded px-2 py-1 text-green-500' : ''
                                }`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        <svg className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Smooth Transition */}
            <div className={`md:hidden transform transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <ul className="bg-gray-900 bg-opacity-90 text-center py-4 space-y-2 text-white">
                    {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-lg hover:text-green-500 transition duration-300"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
