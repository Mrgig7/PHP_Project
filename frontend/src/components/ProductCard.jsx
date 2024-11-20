import { useState } from 'react';
import { FramerModal } from './Modal';
import PropTypes from 'prop-types';

const ProductCard = ({ title, description, imageUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full">
            <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-72 text-center transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <img 
                    src={imageUrl} 
                    alt="" 
                    className="h-36 sm:h-48 w-full object-cover rounded-md mb-3 sm:mb-4" 
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {description.slice(0, 50)}...
                </p>
                <button className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition text-sm sm:text-base">
                    Learn More
                </button>
            </div>

            {/* Modal Component */}
            <FramerModal open={isModalOpen} setOpen={setIsModalOpen}>
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <img 
                        src="https://via.placeholder.com/150" 
                        alt="Placeholder" 
                        className="h-32 sm:h-40 w-full object-contain mb-3 sm:mb-4 rounded-lg" 
                    />
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
                        {title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                        {description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-4">
                        {['#Tag1', '#Tag2', '#Tag3'].map((tag, index) => (
                            <span 
                                key={index} 
                                className="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </FramerModal>
        </div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default ProductCard;
