import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import * as THREE from "three";

const useCelestialViewer = (config) => {
  const {
    dataUrl,
    fetchDataFn,
    globeTextureUrl,
    getSizeFn,
    getColorFn,
    orbitColor,
    sizeScaleFactor,
    getOrbitParamsFn,
    cameraDistance,
    createSun,
  } = config;

  const [celestialData, setCelestialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const globeEl = useRef();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const data = await response.json();

        // Process data based on the passed function
        const processedData = fetchDataFn(data);
        setCelestialData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataUrl, fetchDataFn]);

  // Initialize Globe and animate objects
  useEffect(() => {
    if (celestialData.length > 0) {
      const globe = Globe()(globeEl.current)
        .globeImageUrl(globeTextureUrl)
        .backgroundColor("#000000");

      // Adjust camera if necessary
      const globeRadius = globe.getGlobeRadius();
      if (cameraDistance) {
        globe.camera().position.setZ(globeRadius * cameraDistance);
      }

      if (createSun) {
        // Create Sun
        const sunGeometry = new THREE.SphereGeometry(2.2, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
          color: "yellow",
          transparent: true,
          opacity: 0.8,
        });
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        sunMesh.position.set(0, 0, 0); // Place Sun at the center
        globe.scene().add(sunMesh);
      }

      celestialData.forEach((object) => {
        const { semiMajorAxis, eccentricity, inclination } =
          getOrbitParamsFn(object);

        // Create celestial object (e.g., planet, asteroid)
        const objectGeometry = new THREE.SphereGeometry(
          getSizeFn(object) * sizeScaleFactor,
          16,
          16
        );

        const objectMaterial = new THREE.MeshLambertMaterial({
          color: getColorFn(object),
          transparent: true,
          opacity: 0.8,
        });
        const objectMesh = new THREE.Mesh(objectGeometry, objectMaterial);

        // Create orbit points
        const orbitPoints = [];
        const totalPoints = 360;
        for (let i = 0; i <= totalPoints; i++) {
          const trueAnomaly = (i / totalPoints) * Math.PI * 2;
          const radius =
            (semiMajorAxis * (1 - eccentricity * eccentricity)) /
            (1 + eccentricity * Math.cos(trueAnomaly));

          const x = radius * Math.cos(trueAnomaly);
          const y = radius * Math.sin(trueAnomaly);
          const z = y * Math.sin(inclination * (Math.PI / 180));
          const adjustedY = y * Math.cos(inclination * (Math.PI / 180));

          orbitPoints.push(new THREE.Vector3(x, adjustedY, z));
        }

        // Create orbit trace
        const traceGeometry = new THREE.BufferGeometry();
        const traceMaterial = new THREE.LineBasicMaterial({
          color: orbitColor,
        });
        const traceLine = new THREE.Line(traceGeometry, traceMaterial);

        // Add object and orbit to the globe
        globe.scene().add(objectMesh);
        globe.scene().add(traceLine);

        // Animate object along the orbit
        let currentPointIndex = 0;
        const tracePoints = [];
        const animateObject = () => {
          const point = orbitPoints[currentPointIndex];
          objectMesh.position.set(point.x, point.y, point.z);
          tracePoints.push(new THREE.Vector3(point.x, point.y, point.z));
          traceGeometry.setFromPoints(tracePoints);
          currentPointIndex = (currentPointIndex + 1) % orbitPoints.length;
          requestAnimationFrame(animateObject);
        };
        animateObject();
      });
    }
  }, [
    celestialData,
    getSizeFn,
    getOrbitParamsFn,
    sizeScaleFactor,
    getColorFn,
    orbitColor,
    cameraDistance,
    createSun,
  ]);

  return { globeEl, loading };
};

export default useCelestialViewer;
