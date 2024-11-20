// import React from 'react';
import { motion } from 'framer-motion'; 
import { FaSeedling, FaShippingFast, FaRegBuilding, FaUsers } from 'react-icons/fa'; 
import mdPhoto from '../assets/placeholder.jpeg'; 
import managerPhoto from '../assets/placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center text-gray-800 bg-cover bg-center ">
            {/* Hero Section with Background */}
            <section className="w-full h-screen bg-cover bg-center bg-about-pattern flex items-center justify-center text-white text-center relative px-4 sm:px-6 animate-fade-in">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative max-w-lg animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-wider animate-slide-down">
                        About Us
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 animate-fade-in-delay px-2">
                        Welcome to Cocox, a leading manufacturer and exporter of high-quality Coco Peat products.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition transform hover:scale-105 animate-bounce text-lg"
                    >
                        Explore Products
                    </button>
                </div>
            </section>

            {/* Our Mission and Vision Section */}
            <section className="py-16 px-6 max-w-4xl text-center">
                <h2 className="text-3xl font-semibold mb-8">Our Mission and Vision</h2>
                <motion.p 
                    className="text-lg text-gray-700 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    At Cocox, our mission is to provide eco-friendly and sustainable solutions for modern gardening and agriculture needs. 
                    We strive to create products that nurture the environment and contribute to the well-being of plants, while also offering 
                    excellent customer service worldwide.
                </motion.p>
                <motion.img 
                    src="https://via.placeholder.com/800x400" 
                    alt="Company building" 
                    className="w-full rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
            </section>

            {/* Key Features Section */}
            <section className="py-16 px-6 max-w-4xl text-center">
                <h2 className="text-3xl font-semibold mb-8">Why Choose Cocox?</h2>
                <div className="flex flex-wrap justify-center gap-12">
                    {/* Feature 1 */}
                    <motion.div 
                        className="w-64 p-6 bg-white shadow-lg rounded-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <FaSeedling className="text-4xl text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold">Sustainable Products</h3>
                        <p className="text-gray-600">We offer eco-friendly and sustainable solutions to help you grow healthier plants.</p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div 
                        className="w-64 p-6 bg-white shadow-lg rounded-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <FaShippingFast className="text-4xl text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold">Fast Shipping</h3>
                        <p className="text-gray-600">We deliver our products to your doorstep quickly, ensuring your needs are met on time.</p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div 
                        className="w-64 p-6 bg-white shadow-lg rounded-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <FaRegBuilding className="text-4xl text-yellow-500 mb-4" />
                        <h3 className="text-xl font-semibold">Modern Infrastructure</h3>
                        <p className="text-gray-600">Our state-of-the-art infrastructure ensures the best production standards and quality assurance.</p>
                    </motion.div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-16 px-6 max-w-4xl text-center">
                <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {/* MD Card */}
                    <motion.div 
                        className="w-64 p-6 bg-white shadow-lg rounded-lg text-center transform transition-transform hover:scale-105"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src={mdPhoto} alt="Managing Director" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Managing Director</h3>
                        <p className="text-gray-600">Sundaraja leads the team with a vision for sustainable growth and eco-friendly practices.</p>
                    </motion.div>

                    {/* Manager Card */}
                    <motion.div 
                        className="w-64 p-6 bg-white shadow-lg rounded-lg text-center transform transition-transform hover:scale-105"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <img src={managerPhoto} alt="Marketing Manager" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Marketing Manager</h3>
                        <p className="text-gray-600">Our Marketing Manager ensures that Cocox reaches its customers with the right message and approach.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
