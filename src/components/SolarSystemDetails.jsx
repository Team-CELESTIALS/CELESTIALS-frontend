import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Navbar from './Navbar/Navbar';

const SolarSystem = () => {
  const sceneRef = useRef();

  const width = window.innerWidth;
  const height = window.innerHeight;

  const celestialData = {
    sun: { radius: 696340 * 2, texture: './sun.png' },
    earth: { radius: 6371, distanceFromSun: 149600000, texture: './earth.jpg' },
    moon: { radius: 1737.4, distanceFromEarth: 384400, texture: './moon.jpg' },
    asteroidCount: 100,
    cometCount: 500,
    starCount: 100000,
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

    // Create the Sun
    const sunGeometry = new THREE.SphereGeometry(celestialData.sun.radius / 100000, 84, 84);
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: new THREE.Color(0xff4500),
      emissiveIntensity: 2,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -celestialData.earth.distanceFromSun / 1000000);
    scene.add(sun);

    // Sunlight coming from the Sun
    const sunlight = new THREE.DirectionalLight(0xffffff, 2);
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
    earth.add(moon);

    // Set up orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.maxPolarAngle = Math.PI / 2;

    // Initial camera position
    camera.position.set(10, 20, 50);
    controls.target.set(0, 0, 0);
    controls.update();

    // Create realistic stars
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(celestialData.starCount * 3);
    for (let i = 0; i < celestialData.starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
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
      const distanceFromSun = (celestialData.earth.distanceFromSun / 1000000) + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const x = distanceFromSun * Math.cos(angle);
      const z = distanceFromSun * Math.sin(angle);
      comet.position.set(x, 0, z);
      scene.add(comet);
    }

    // Animate celestial objects
    const animate = () => {
      requestAnimationFrame(animate);
      camera.position.z > 1 && (camera.position.z -= 1);
      earth.rotation.y += 0.01;

      const moonOrbitX = (celestialData.moon.distanceFromEarth / 10000) * Math.cos(Date.now() * 0.0002);
      const moonOrbitZ = (celestialData.moon.distanceFromEarth / 10000) * Math.sin(Date.now() * 0.0002);
      moon.position.set(moonOrbitX + earth.position.x, 0, moonOrbitZ + earth.position.z);
      moon.rotation.y += 0.002;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [width, height]);

  return (
   <>
   <Navbar />
   <div ref={sceneRef} />
   </>
  );
};

export default SolarSystem;
