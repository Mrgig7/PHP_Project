import React from 'react';
import logo from '../assets/logo.svg'; // Adjust the path as necessary

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <img src={logo} alt="Loading..." className="w-32 h-32 animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
