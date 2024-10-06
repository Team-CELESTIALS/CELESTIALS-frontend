import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Navbar from './Navbar/Navbar';

const SolarSystem = () => {
  const sceneRef = useRef();

  const width = window.innerWidth;
  const height = window.innerHeight;

  const celestialData = {
    sun: { radius: 696340 * 2, texture: './sun.png' }, // Double the radius for larger sun
    earth: { radius: 6371, distanceFromSun: 149600000, texture: './earth.jpg' },
    moon: { radius: 1737.4, distanceFromEarth: 384400, texture: './moon.jpg' },
    asteroidCount: 100,
    cometCount: 500, // Number of comets
    starCount: 100000, // Number of stars
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load(celestialData.sun.texture);
    const earthTexture = textureLoader.load(celestialData.earth.texture);
    const moonTexture = textureLoader.load(celestialData.moon.texture);
    
    // Load Milky Way texture
    const milkyWayTexture = textureLoader.load('./milkyway_texture.jpg'); // You need to have this texture

    // Create the Milky Way
    const milkyWayGeometry = new THREE.SphereGeometry(2000, 64, 64);
    const milkyWayMaterial = new THREE.MeshBasicMaterial({
      map: milkyWayTexture,
      side: THREE.BackSide, // Render the inside of the sphere
      opacity: 0.7,
      transparent: true,
    });
    const milkyWay = new THREE.Mesh(milkyWayGeometry, milkyWayMaterial);
    scene.add(milkyWay);

    // Create the Sun
    const sunGeometry = new THREE.SphereGeometry(celestialData.sun.radius / 100000, 84, 84);
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: new THREE.Color(0xff4500), // Orange-red color
      emissiveIntensity: 2, // Adjust intensity to make it appear brighter
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -celestialData.earth.distanceFromSun / 1000000);
    scene.add(sun);

    // Sunlight coming from the Sun
    const sunlight = new THREE.DirectionalLight(0xffffff, 2); // Increase light intensity
    sunlight.position.set(0, 0, -celestialData.earth.distanceFromSun / 1000000);
    scene.add(sunlight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Create the Earth
    const earthGeometry = new THREE.SphereGeometry(celestialData.earth.radius / 1000, 32, 32);
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create the Moon
    const moonGeometry = new THREE.SphereGeometry(celestialData.moon.radius / 1000, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    earth.add(moon); // Add Moon to Earth

    // Set up orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.maxPolarAngle = Math.PI / 2;

    // Initial camera position far away from the solar system
    camera.position.set(0, 50, 150);
    controls.target.set(0, 0, 0);
    controls.update();

    // Create realistic stars
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(celestialData.starCount * 3); // 3 coordinates per star
    for (let i = 0; i < celestialData.starCount; i++) {
      const x = (Math.random() - 0.5) * 2000; // Random X position
      const y = (Math.random() - 0.5) * 2000; // Random Y position
      const z = (Math.random() - 0.5) * 2000; // Random Z position
      starPositions.set([x, y, z], i * 3);
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    // Create the star material
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const stars = new THREE.Points(starsGeometry, starMaterial);
    scene.add(stars);

    // Create asteroid belt
    const asteroidGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 'gray' });

    for (let i = 0; i < celestialData.asteroidCount; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      const distanceFromEarth = (celestialData.earth.radius / 800) + Math.random() * 2;
      const angle = Math.random() * Math.PI * 2;
      const x = distanceFromEarth * Math.cos(angle);
      const z = distanceFromEarth * Math.sin(angle);
      asteroid.position.set(x, 0, z);
      earth.add(asteroid);
    }

    // Create comets
    const cometGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const cometMaterial = new THREE.MeshStandardMaterial({ color: 'white' });

    for (let i = 0; i < celestialData.cometCount; i++) {
      const comet = new THREE.Mesh(cometGeometry, cometMaterial);
      const distanceFromSun = (celestialData.earth.distanceFromSun / 1000000) + Math.random() * 5; // Random distance from Sun
      const angle = Math.random() * Math.PI * 2;
      const x = distanceFromSun * Math.cos(angle);
      const z = distanceFromSun * Math.sin(angle);
      comet.position.set(x, 0, z);
      scene.add(comet);
    }

    // Animate celestial objects and handle day/night cycle
    const animate = () => {
      requestAnimationFrame(animate);

      // Camera zooming effect
      if (camera.position.z > 1) {
        camera.position.z -= 1; // Adjust speed of zoom
      }

      // Earth's rotation for day/night cycle
      earth.rotation.y += 0.001; // Speed of Earth's rotation

      // Update Moon's position around the Earth (slower orbit speed)
      const moonOrbitX = (celestialData.moon.distanceFromEarth / 10000) * Math.cos(Date.now() * 0.0002); // Slower speed
      const moonOrbitZ = (celestialData.moon.distanceFromEarth / 10000) * Math.sin(Date.now() * 0.0002); // Slower speed
      moon.position.set(moonOrbitX + earth.position.x, 0, moonOrbitZ + earth.position.z); // Position relative to Earth

      // Moon's rotation on its axis
      moon.rotation.y += 0.002; // Adjust the speed of Moon's rotation

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
   <>
   <Navbar/>
   <div>
      <div ref={sceneRef} />
    </div>
   </>
  );
};

export default SolarSystem;
