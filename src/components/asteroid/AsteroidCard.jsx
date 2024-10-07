import React from "react";
import { Link } from "react-router-dom";

const AsteroidCard = ({ asteroid }) => {
  return (
    <div className="bg-background text-white rounded-lg p-8 leading-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-2">{asteroid.name}</h3>
      <div className="text-lg">
        <p>
          <strong>Speed:</strong> {asteroid.speed} km/s
        </p>
        <p>
          <strong>Approach Date:</strong> {asteroid.approachDate}
        </p>
        <p>
          <strong>Distance:</strong> {asteroid.distance} km
        </p>
        <p>
          <strong>Diameter:</strong> {asteroid.diameter} km
        </p>

        {/* Updated View Details Button */}
        <button
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition-transform transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          View Details
        </button>

        {/* Updated View Orbit Link */}
        <Link
          to={`/orbit/${asteroid.id}`}
          className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 ml-4 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition-transform transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          View Orbit
        </Link>
      </div>
    </div>
  );
};

export default AsteroidCard;
