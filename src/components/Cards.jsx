import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import solar from '../../public/solar.gif';

// Card data
const cardData = [
  {
    id: 1,
    title: 'Earth',
    image: 'https://www.agiratech.com/wp-content/uploads/2020/02/Google-map.gif',
    description: 'Explore the beauty of our planet.',
    route: '/earth-details',
  },
  {
    id: 2,
    title: 'Satellites',
    image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHRmcmp6NjAyYnFhcXF2dHk3ZDl6N285eTB1eTc1MzZwYzB6M3lyOCZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/pj8JBNy4rExF29o411/giphy.webp',
    description: 'Discover the wonders of satellites orbiting our planet.',
    route: '/satellites-details',
  },
  {
    id: 3,
    title: 'Solar System',
    image: solar,
    description: 'Learn about the celestial bodies that orbit our sun.',
    route: '/solar-system-details',
  },
];

// Cards Component
const Cards = () => {
  return (
    <div className="bg-black">
      {/* Background animation */}
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>

      <div className="px-4 bg-gray-900 min-h-screen flex flex-col items-center pb-10">
        <h1 className="text-4xl font-bold pb-10 text-white text-center mt-0 pt-36"
          style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Welcome to the Universe
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-transparent text-white rounded-lg overflow-hidden shadow-lg backdrop-blur-lg transition-all duration-500 transform hover:scale-105 hover:bg-opacity-50 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <div className="relative w-full h-64">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain"
                  style={{ objectFit: 'contain', fontFamily: 'Montserrat, sans-serif'  }} // Ensures image fits without being cropped
                />
              </div>

              <div className="p-6 backdrop-blur-lg bg-transparent">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-300 mb-4">{card.description}</p>
                <Link
                  to={card.route}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition duration-500 hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
