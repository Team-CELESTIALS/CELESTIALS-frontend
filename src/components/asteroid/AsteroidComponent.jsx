import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import AsteroidCard from "./AsteroidCard";

const NASA_API_KEY = "nT9do2SitdTErnbSiVmd6egO1frq0PT9XUoMdXgg";

const AsteroidComponent = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${NASA_API_KEY}`
        );
        const data = await response.json();

        const fetchedAsteroids = [];
        const dates = Object.keys(data.near_earth_objects);
        dates.forEach((date) => {
          const asteroidsOnDate = data.near_earth_objects[date];
          asteroidsOnDate.forEach((asteroid) => {
            fetchedAsteroids.push({
              id: asteroid.id,
              name: asteroid.name,
              speed: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second,
              approachDate: asteroid.close_approach_data[0].close_approach_date_full,
              distance: asteroid.close_approach_data[0].miss_distance.kilometers,
              diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
              nasa_jpl_url: asteroid.nasa_jpl_url,
            });
          });
        });

        setAsteroids(fetchedAsteroids);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      <div className="container p-8 mx-auto">
        <h1 className=" text-4xl sm:text-5xl text-center font-bold mb-16">
          Near-Earth Asteroids
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(12)
              .fill()
              .map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {asteroids.map((asteroid) => (
              <AsteroidCard key={asteroid.id} asteroid={asteroid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AsteroidComponent;
