import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import zoomSound from '../../../public/sound.mp3'; // Replace with your own sound file path
import logo from '../../../public/logo.png'; // Replace with your own logo path

const Starfield = () => {
  const mountRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Star generation (increase star count for more density)
    const stars = new THREE.Group();
    scene.add(stars);

    const starGeometry = new THREE.SphereGeometry(0.1, 24, 24); // Increased star size
    const starColors = [0xffffff, 0x00bfff, 0x1e90ff, 0x87ceeb]; // White and different shades of blue

    for (let i = 0; i < 5000; i++) {  // Further increased number of stars
      const starMaterial = new THREE.MeshBasicMaterial({
        color: starColors[Math.floor(Math.random() * starColors.length)], // Randomly select color
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      // Random positions for stars
      star.position.x = THREE.MathUtils.randFloatSpread(400);
      star.position.y = THREE.MathUtils.randFloatSpread(400);
      star.position.z = THREE.MathUtils.randFloatSpread(400);

      stars.add(star);
    }

    // Position the camera
    camera.position.z = 10;

    // Handle resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Sound setup
    const audio = new Audio(zoomSound);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.4;  // Start with low volume
    audio.play();

    // Animate stars zooming in with sound effect increasing
    let speed = 0.1; // Adjust zoom speed
    let soundRate = 1;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and zoom stars
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0005;
      camera.position.z -= speed;

      // Increase zoom speed and sound pitch
      speed += 0.0005;
      soundRate += 0.001;  // Gradually increase sound pitch

      if (audioRef.current) {
        audioRef.current.playbackRate = soundRate; // Adjust sound speed with zoom
        audioRef.current.volume = Math.min(speed * 2, 1);  // Increase volume gradually
      }

      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="team-logo" style={logoStyle}>
        <img src={logo} alt="Team CLESTIALS Logo" style={imageStyle} />
        <div style={textStyle}>Team CLESTIALS</div>
      </div>
    </div>
  );
};

// Styles for the logo and text
const logoStyle = {
  position: 'absolute',
  bottom: '20px',  // Adjust as needed
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
  color: '#00bfff', // Text color
  textShadow: '0 0 10px rgba(0, 191, 255, 0.8)', // Blue glow effect
  zIndex: 10, // Ensure it is above the starfield
};

const imageStyle = {
  width: '100px', // Adjust size as needed
  height: 'auto',
  marginBottom: '10px', // Space between logo and text
};

const textStyle = {
  fontSize: '24px', // Adjust size as needed
  fontWeight: 'bold',
};

export default Starfield;
