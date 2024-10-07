import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import solar from '../../public/solar.gif';
import sate from '../../public/sate.gif';
import astro from '../../public/astro.gif';

// Card data
const cardData = [
  {
    id: 1,
    title: 'Asteroids',
    image: astro,
    description: 'Explore the beauty of our planet.',
    route: '/asteroid',
  },
  {
    id: 2,
    title: 'Satellites',
    image: sate,
    description: 'Learn about the celestial bodies that orbit our sun.',
    route: '/earth-details',
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

      <div className="px-4 bg-background min-h-screen flex flex-col items-center pb-10">
        <h1 className="text-4xl font-bold mb-10 text-center p-0 mt-36 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Welcome to the Universe
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cardData.map((card) => (
            <div
              key={card.id}
              className=" text-white overflow-hidden transition-all duration-500 transform hover:scale-105 custom-card"
            >
              <div className="relative w-full h-64 card-pic">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-c"
                  style={{ objectFit: 'cover', fontFamily: 'Montserrat, sans-serif'  }} // Ensures image fits without being cropped
                />
              </div>

              <div className="p-6 backdrop-blur-lg bg-transparent">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-300 mb-4">{card.description}</p>
                <Link
                  to={card.route}
                  className="inline-block bg-primary-mid text-white px-4 py-2 rounded shadow hover:bg-primary-dim transition duration-500 hover:shadow-lg"
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
