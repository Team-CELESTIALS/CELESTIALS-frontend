import React from "react";
import { Link } from "react-router-dom";

const AsteroidCard = ({ asteroid }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-8 leading-6 shadow-lg">
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
        <a
          href={asteroid.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mr-2"
        >
          View Details
        </a>
        <Link
          to={`/orbit/${asteroid.id}`}
          className="text-blue-400 underline"
        >
          View Orbit
        </Link>
      </div>
    </div>
  );
};

export default AsteroidCard;
