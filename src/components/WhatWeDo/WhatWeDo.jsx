import React from 'react';
import { FaRocket, FaMoon, FaRegStar } from 'react-icons/fa';
import './WhatWeDo.css';

const WhatWeDo = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-content">
                <h1>What We Do</h1>
                <p>
                    Our project is focused on real-time tracking of celestial objects such as asteroids, satellites, and planets. 
                    We provide a 3D visualization platform that allows users to observe the movement of nearby objects, 
                    understand the positioning of satellites orbiting the Earth, and explore the paths of different planets in our solar system. 
                    This tool offers invaluable insights for researchers and space enthusiasts alike.
                </p>
                
                <div className="feature-icons">
                    <div className="icon">
                        <FaRocket size={50} color="#00ffcc" /> {/* Icon for Asteroids */}
                        <p>Track different asteroids and monitor their real time approach towards Earth.</p>
                    </div>
                    <div className="icon">
                        <FaMoon size={50} color="#ffcc00" /> {/* Icon for Satellites */}
                        <p>View the orbiting satellites revolving around the Earth in real-time.</p>
                    </div>
                    <div className="icon">
                        <FaRegStar size={50} color="#ff6699" /> {/* Icon for Planets */}
                        <p>Explore the planetary systems, different orbits, and their relationships in space.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDo;
