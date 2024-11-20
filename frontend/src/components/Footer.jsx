import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUp, faHome, faBoxOpen, faInfoCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 relative">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col items-center sm:items-start space-y-3">
                        <img src={logo} alt="Company Logo" className="w-32" />
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            We manufacture 100% natural, superior Coco Coir products, delivering premium value to our customers.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center sm:items-center lg:items-center space-y-3">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <div className="flex flex-col items-center space-y-2">
                            <a href="/" className="flex items-center justify-center space-x-2 text-white hover:text-green-500">
                                <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                            </a>
                            <a href="/products" className="flex items-center justify-center space-x-2 text-white hover:text-green-500">
                                <FontAwesomeIcon icon={faBoxOpen} /> <span>Products</span>
                            </a>
                            <a href="/about-us" className="flex items-center justify-center space-x-2 text-white hover:text-green-500">
                                <FontAwesomeIcon icon={faInfoCircle} /> <span>About Us</span>
                            </a>
                            <a href="/contact" className="flex items-center justify-center space-x-2 text-white hover:text-green-500">
                                <FontAwesomeIcon icon={faPhone} /> <span>Contact</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center sm:items-start space-y-3">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <div className="space-y-2 text-gray-400 text-sm text-center sm:text-left">
                            <p>No.14/2, Nehru Nagar East, Coimbatore, Tamil Nadu, India – 641014</p>
                            <p className="flex items-center justify-center sm:justify-start">
                                <FontAwesomeIcon icon={faEnvelope} className="text-green-500 mr-2" /> 
                                contact@cococoir.com
                            </p>
                            <div className="flex justify-center sm:justify-start space-x-4 mt-3">
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-xs mt-8 pt-4 border-t border-gray-600">
                    © 2024 CocoCoir. All Rights Reserved.
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out z-50"
                    aria-label="Scroll to top"
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
        </footer>
    );
};

export default Footer;
