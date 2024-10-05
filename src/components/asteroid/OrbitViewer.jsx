import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useCelestialViewer from "../../hooks/useCelestialViewer";
import Navbar from "../Navbar/Navbar";

const NASA_API_URL = (asteroidId) =>
  `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=nT9do2SitdTErnbSiVmd6egO1frq0PT9XUoMdXgg`;

const OrbitViewer = () => {
  const { asteroidId } = useParams();


  const getAsteroidData = useCallback(
    (data) => [
      {
        name: data.name,
        orbitData: {
          semiMajorAxis: data.orbital_data.semi_major_axis * 1000, // AU to km
          eccentricity: data.orbital_data.eccentricity,
          inclination: data.orbital_data.inclination,
        },
        size: 1600,
        color: "orange",
      },
    ],
    []
  );

  const { globeEl, loading } = useCelestialViewer({
    dataUrl: NASA_API_URL(asteroidId),
    fetchDataFn: getAsteroidData,
    globeTextureUrl:
      "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    getSizeFn: (asteroid) => asteroid.size,
    getColorFn: (asteroid) => asteroid.color,
    orbitColor: "cyan",
    sizeScaleFactor: 0.01,
    getOrbitParamsFn: (asteroid) => asteroid.orbitData,
    cameraDistance: 30,
    createSun: false,
  });

  if (loading) return <div>Loading...</div>;

  return (
   <>
   <Navbar/>
    <div className="w-full overflow-hidden">
      <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />
    </div>
   </>
  );
};

export default OrbitViewer;
