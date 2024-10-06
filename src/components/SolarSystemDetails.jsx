import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const sceneRef = useRef();
  
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Real-world data (scaled down for visualization purposes)
  const celestialData = {
    sun: { radius: 696340, color: 'yellow' },
    earth: { radius: 6371, distanceFromSun: 149600000, color: 'blue', orbitSpeed: 0.000005, texture: './earth.jpg' },
    moon: { radius: 1737.4, distanceFromEarth: 384400, color: 'grey', orbitSpeed: 0.00005, texture: './moon.jpg' },
    asteroidCount: 100, // Number of asteroids around Earth
  };

  useEffect(() => {
    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 10000000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);

    // Create the Sun with light
    const sunGeometry = new THREE.SphereGeometry(celestialData.sun.radius / 100000, 64, 64); // Scale down Sun's size
    const sunMaterial = new THREE.MeshBasicMaterial({ color: celestialData.sun.color });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Sunlight for Earth
    const sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunlight.position.set(0, 0, 10); // Position the light to simulate sun direction
    scene.add(sunlight);

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(celestialData.earth.texture);

    // Create the Earth with shading (day/night effect)
    const earthGeometry = new THREE.SphereGeometry(celestialData.earth.radius / 1000, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create the Moon
    const moonGeometry = new THREE.SphereGeometry(celestialData.moon.radius / 1000, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: celestialData.moon.color });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    earth.add(moon); // Add the moon as a child of the Earth for rotation

    // Position the Earth
    earth.position.x = celestialData.earth.distanceFromSun / 1000000;

    // Orbit Ellipse for Earth
    const earthOrbitCurve = new THREE.EllipseCurve(
      0, 0, // Center
      celestialData.earth.distanceFromSun / 1000000, celestialData.earth.distanceFromSun / 1500000, // X and Z radius for ellipse
      0, 2 * Math.PI // Start and end angle
    );

    const earthOrbitPath = new THREE.Path(earthOrbitCurve.getPoints(100));
    const earthOrbitGeometry = new THREE.BufferGeometry().setFromPoints(earthOrbitPath.getPoints());
    const earthOrbitMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const earthOrbitLine = new THREE.Line(earthOrbitGeometry, earthOrbitMaterial);
    scene.add(earthOrbitLine);

    // Orbit Ellipse for Moon
    const moonOrbitCurve = new THREE.EllipseCurve(
      0, 0, 
      celestialData.moon.distanceFromEarth / 5000, celestialData.moon.distanceFromEarth / 6000, 
      0, 2 * Math.PI
    );
    const moonOrbitPath = new THREE.Path(moonOrbitCurve.getPoints(100));
    const moonOrbitGeometry = new THREE.BufferGeometry().setFromPoints(moonOrbitPath.getPoints());
    const moonOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const moonOrbitLine = new THREE.Line(moonOrbitGeometry, moonOrbitMaterial);
    earth.add(moonOrbitLine);

    // Set up orbit controls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.maxPolarAngle = Math.PI / 2;

    // Move camera back to view the entire solar system
    camera.position.set(0, 0, 100);

    // Stars background
    const starGeometry = new THREE.SphereGeometry(90, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load('./stars.jpg'),
      side: THREE.BackSide
    });
    const starField = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starField);

    // Create asteroid belt around Earth
    const asteroidGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

    for (let i = 0; i < celestialData.asteroidCount; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

      // Randomize asteroid positions in orbit around Earth
      const distanceFromEarth = (celestialData.earth.radius / 800) + Math.random() * 2;
      const angle = Math.random() * Math.PI * 2;
      const x = distanceFromEarth * Math.cos(angle);
      const z = distanceFromEarth * Math.sin(angle);

      asteroid.position.set(x, 0, z);
      earth.add(asteroid); // Add asteroid as a child of Earth for orbiting effect
    }

    // Animate celestial objects
    const animate = () => {
      requestAnimationFrame(animate);

      // Earth's orbit around the Sun
      const timeFactor = 0.0005; // Slow down the orbit speed
      earth.rotation.y += celestialData.earth.orbitSpeed; // Earth's rotation

      // Calculate Earth's orbit position (simple elliptical orbit)
      const earthOrbitX = celestialData.earth.distanceFromSun / 1000000 * Math.cos(Date.now() * timeFactor);
      const earthOrbitZ = (celestialData.earth.distanceFromSun / 1500000) * Math.sin(Date.now() * timeFactor);
      earth.position.set(earthOrbitX, 0, earthOrbitZ);

      // Moon's orbit around the Earth
      const moonOrbitX = celestialData.moon.distanceFromEarth / 5000 * Math.cos(Date.now() * celestialData.moon.orbitSpeed);
      const moonOrbitZ = celestialData.moon.distanceFromEarth / 6000 * Math.sin(Date.now() * celestialData.moon.orbitSpeed);
      moon.position.set(moonOrbitX, 0, moonOrbitZ);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      sceneRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <div ref={sceneRef} />
    </div>
  );
};

export default SolarSystem;
