import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Globe from "globe.gl";
import * as THREE from "three";
import asteroidTextureImg from "../../public/astroid.jpg"; // Import the asteroid image
const moonTextureUrl = "https://nasa3d.arc.nasa.gov/shared_assets/thumbnails/as08-17-2704/428x321"; 
import Navbar from '../components/Navbar/Navbar'

const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers
const ASTEROID_SIZE = 60; // Default size for the asteroid object
const MOON_RADIUS_KM = 3474; // Moon's radius in kilometers (larger size)
const MOON_ORBIT_RADIUS = 1.5; // Orbit radius for the moon around the Earth in Earth radii
const MOON_ORBIT_SPEED = 0.005; // Speed of moon's orbit
const NASA_API_KEY = "nT9do2SitdTErnbSiVmd6egO1frq0PT9XUoMdXgg";

const AsteroidGlobe = () => {
  const globeEl = useRef();
  const [asteroids, setAsteroids] = useState([]);
  const [hoveredAsteroid, setHoveredAsteroid] = useState(null);
  const moonMeshRef = useRef(); // Reference to the moon mesh
  const [selectedAsteroid, setSelectedAsteroid] = useState(null); // State for the currently selected asteroid
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const navigate = useNavigate(); 
  // Fetch Near-Earth Asteroid data from NASA NeoWs API
  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${NASA_API_KEY}`
        );
        const neoData = await response.json();

        const newAsteroids = []; // Temporary array to collect all asteroids

        const arrOfDates = Object.keys(neoData.near_earth_objects);
        arrOfDates.forEach((date) => {
          const asteroidsOnDate = neoData.near_earth_objects[date];

          asteroidsOnDate.forEach((asteroid) => {
            newAsteroids.push({
              lat: Math.random() * 180 - 90, // Random latitude for movement (adjust as necessary)
              lng: Math.random() * 360 - 180, // Random longitude for movement (adjust as necessary)
              alt: asteroid.estimated_diameter.kilometers.estimated_diameter_max / 1000, // Relative altitude
              name: asteroid.name,
              velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour, // Set velocity for movement
              details: asteroid, // Store the full details for hover
              id : asteroid.id,
            });
          });
        });

        setAsteroids(newAsteroids);
      } catch (error) {
        console.error("Error fetching asteroid data:", error);
      }
    };

    fetchAsteroids();
  }, []);

  useEffect(() => {
    const world = Globe()(globeEl.current)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .objectLat("lat")
      .objectLng("lng")
      .objectAltitude("alt")
      .objectLabel("name")
      .onObjectClick((asteroid ) => navigate(`/orbit/${asteroid.id}`) )
      .onObjectHover((asteroid) => setHoveredAsteroid(asteroid ? asteroid.details : null));

    // Load the asteroid texture
    const asteroidTexture = new THREE.TextureLoader().load(asteroidTextureImg);

    // Create geometries for the asteroids and moon
    const asteroidGeometry = new THREE.SphereGeometry(
      (ASTEROID_SIZE * world.getGlobeRadius()) / EARTH_RADIUS_KM,
      16,
      16
    );
    const moonGeometry = new THREE.SphereGeometry((MOON_RADIUS_KM / EARTH_RADIUS_KM) * 1.5, 32, 32);

    // Create materials with the textures
    const asteroidMaterial = new THREE.MeshLambertMaterial({
      map: asteroidTexture,
      transparent: true,
      opacity: 0.8,
    });

    const moonTexture = new THREE.TextureLoader().load(moonTextureUrl);
    const moonMaterial = new THREE.MeshLambertMaterial({
      map: moonTexture,
      transparent: true,
      opacity: 1.0,
    });

    // Animate the asteroid motion
    const animateAsteroids = () => {
      asteroids.forEach((asteroid, index) => {
        const obj = world.objectsData()[index]; // Fetch the current object

        if (obj) {
          // Calculate speed based on the asteroid's velocity
          const speed = asteroid.velocity / 1000000; // Adjust speed scaling

          // Increment the position for a basic motion effect
          obj.lat += speed * 0.01; // Adjust this for desired movement
          obj.lng += speed * 0.01;
          obj.alt = Math.sin(Date.now() * 0.0001 + index) * 0.02 + 1.0; // Adding variation in altitude
        }
      });

      world.objectsData([...asteroids]);
      requestAnimationFrame(animateAsteroids);
    };

    // Set the asteroids data to render on the globe
    world.objectsData(asteroids).objectThreeObject(() => {
      const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      return asteroidMesh;
    });

    // Add moon to the globe
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMeshRef.current = moonMesh; // Store reference to the moon mesh
    world.scene().add(moonMesh); // Add moon mesh to the scene

    // Animate the moon's orbit around the Earth
    let moonAngle = 0; // Initial angle for the moon's orbit
    const animateMoon = () => {
      moonAngle += MOON_ORBIT_SPEED; // Increment angle
      moonMesh.position.set(
        MOON_ORBIT_RADIUS * Math.cos(moonAngle), // X position
        MOON_ORBIT_RADIUS * Math.sin(moonAngle), // Y position
        0 // Z position (flat in 2D)
      );
      requestAnimationFrame(animateMoon); // Request the next frame
    };
    animateMoon(); // Start moon animation

    // Start the asteroid animation loop
    animateAsteroids();

      }, [asteroids]);

  const handleAsteroidClick = (asteroid) => {
    setSelectedAsteroid(asteroid); // Set the selected asteroid state

    // Rotate the globe to the clicked asteroid's position
    globeEl.current.pointOfView(
      { lat: asteroid.lat, lng: asteroid.lng }, // Move to the asteroid's location
      3000 // Duration of the rotation in milliseconds
    );

    // Move the moon to the clicked asteroid's position
    moonMeshRef.current.position.set(asteroid.lng / 100, asteroid.lat / 100, 0);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
    <Navbar/>
    <div className="flex relative">
      <div ref={globeEl} className="w-full h-screen" />
      <div className={`fixed top-0 left-0 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-80 h-screen overflow-y-auto shadow-lg`}>
        <h2 className="text-center mb-4 mt-20">Asteroids</h2>
        <ul className="list-none p-0">
          {asteroids.map((asteroid, index) => (
            <li
              key={index}
              onClick={() => handleAsteroidClick(asteroid)}
              className={`cursor-pointer p-2 rounded transition-colors duration-300 ${selectedAsteroid === asteroid ? "bg-gray-700" : "hover:bg-gray-600"}`}
            >
              {asteroid.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Toggle Button at the top right */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-16 mt-10 right-4 z-50 bg-gray-800 text-white p-2 rounded shadow-lg transition duration-300 hover:bg-gray-700"
      >
        {sidebarOpen ? "✖" : "☰"} {/* Hamburger and close icon */}
      </button>
      {hoveredAsteroid && (
        <div
          className="absolute bottom-24 right-4 bg-black bg-opacity-80 text-white p-3 rounded"
        >
          <h3>{hoveredAsteroid.name}</h3>
          <p>
            <strong>Diameter (km):</strong>{" "}
            {hoveredAsteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}
          </p>
          <p>
            <strong>Velocity (km/h):</strong> {hoveredAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default AsteroidGlobe;
