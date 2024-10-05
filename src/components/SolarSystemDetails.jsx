import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const sceneRef = useRef();
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Planet data (Radius in km, Distance from Sun in km, Rotation Speed in radians per second)
  const planetData = [
    { name: 'Sun', radius: 696340, distance: 0, color: 'yellow', semiMajorAxis: 2, eccentricity: 0, rotationSpeed: 0.01 },
    { name: 'Mercury', radius: 2439.7, distance: 57900000, color: 'gray', semiMajorAxis: 5.8, eccentricity: 0.2056, rotationSpeed: 0.04 },
    { name: 'Venus', radius: 6051.8, distance: 108200000, color: 'orange', semiMajorAxis: 10.8, eccentricity: 0.0068, rotationSpeed: 0.002 },
    { name: 'Earth', radius: 6371, distance: 149600000, color: 'blue', semiMajorAxis: 12.74, eccentricity: 0.0167, rotationSpeed: 0.01, texture: './earth.jpg' },
    { name: 'Mars', radius: 3389.5, distance: 227900000, color: 'red', semiMajorAxis: 18.6, eccentricity: 0.0934, rotationSpeed: 0.005 },
    { name: 'Jupiter', radius: 69911, distance: 778500000, color: 'brown', semiMajorAxis: 43.2, eccentricity: 0.0484, rotationSpeed: 0.008 },
    { name: 'Saturn', radius: 58232, distance: 1434000000, color: 'lightgoldenrodyellow', semiMajorAxis: 86.0, eccentricity: 0.0565, rotationSpeed: 0.02 },
    { name: 'Uranus', radius: 25362, distance: 2871000000, color: 'lightblue', semiMajorAxis: 170.0, eccentricity: 0.0464, rotationSpeed: 0.007 },
    { name: 'Neptune', radius: 24622, distance: 4495000000, color: 'blue', semiMajorAxis: 273.5, eccentricity: 0.0086, rotationSpeed: 0.006 },
    { name: 'Pluto', radius: 1188.3, distance: 5900000000, color: 'darkgray', semiMajorAxis: 394.0, eccentricity: 0.2488, rotationSpeed: 0.004 }, // Pluto added for completeness
  ];

  // Moon data (Radius in km, Distance from Earth in km, Rotation Speed in radians per second)
  const moonData = [
    { name: 'Moon', radius: 1737.4, distance: 384400, parent: 'Earth', rotationSpeed: 0.01 }
  ];

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);

    // Create the Sun
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets and their orbits
    const planets = [];
    const timeFactor = 0.0001; // Speed factor for the orbital animation
    const textureLoader = new THREE.TextureLoader(); // Texture loader

    planetData.forEach((data) => {
      const planetGeometry = new THREE.SphereGeometry(data.radius / 100000, 32, 32); // Scale down radius for rendering
      let planetMaterial;

      // Load Earth texture if the planet is Earth
      if (data.name === 'Earth' && data.texture) {
        const texture = textureLoader.load(data.texture);
        planetMaterial = new THREE.MeshBasicMaterial({ map: texture });
      } else {
        planetMaterial = new THREE.MeshBasicMaterial({ color: data.color });
      }

      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.userData = {
        semiMajorAxis: data.semiMajorAxis,
        eccentricity: data.eccentricity,
        angle: 0, // Current angle in radians
        rotationSpeed: data.rotationSpeed, // Rotation speed
      };
      scene.add(planet);
      planets.push(planet);

      // Create circular orbit
      const orbitGeometry = new THREE.CircleGeometry(data.semiMajorAxis, 64);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 'white', opacity: 0.5, transparent: true });
      const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2; // Rotate to make it horizontal
      scene.add(orbit);
    });

    // Create moons
    moonData.forEach((moon) => {
      const planet = planets.find(p => p.userData.name === moon.parent);
      if (planet) {
        const moonGeometry = new THREE.SphereGeometry(moon.radius / 100000, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.userData = {
          distance: moon.distance / 100000, // Scale down distance for rendering
          rotationSpeed: moon.rotationSpeed,
          angle: 0,
        };
        planet.add(moonMesh); // Attach moon to its planet
      }
    });

    camera.position.z = 50; // Adjust camera position

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25; // smooth damping factor
    controls.screenSpacePanning = false; // prevents the camera from going up and down
    controls.maxPolarAngle = Math.PI / 2; // restrict vertical rotation

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the planets around the sun and themselves
      planets.forEach((planet) => {
        const { semiMajorAxis, eccentricity, rotationSpeed } = planet.userData;
        planet.userData.angle += timeFactor; // Increment the angle for orbit

        // Calculate the elliptical position
        const x = semiMajorAxis * (1 - eccentricity * Math.cos(planet.userData.angle));
        const y = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(planet.userData.angle);

        planet.position.x = x; // Update x position
        planet.position.z = y; // Update z position

        // Rotate the planet around its axis
        planet.rotation.y += rotationSpeed; // Rotate planet itself
      });

      // Rotate the moons
      moonData.forEach((moon) => {
        const planet = planets.find(p => p.userData.name === moon.parent);
        if (planet) {
          const moonMesh = planet.children.find(child => child.userData && child.userData.name === moon.name);
          if (moonMesh) {
            moonMesh.userData.angle += moon.rotationSpeed; // Increment the angle for the moon's rotation
            const moonX = moonMesh.userData.distance * Math.cos(moonMesh.userData.angle); // Calculate moon's x position
            const moonZ = moonMesh.userData.distance * Math.sin(moonMesh.userData.angle); // Calculate moon's z position
            moonMesh.position.x = moonX; // Update moon x position
            moonMesh.position.z = moonZ; // Update moon z position
          }
        }
      });

      // Update controls
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      sceneRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bg-black w-full h-full">
      {/* Background */}
      <div className="bg-animation w-full h-full">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
        <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />
      </div>
    </div>
  );
};

export default SolarSystem;
