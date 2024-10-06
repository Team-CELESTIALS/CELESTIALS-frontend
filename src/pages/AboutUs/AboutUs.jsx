import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Team from '../../components/Team';
import WhatWeDo from '../../components/WhatWeDo/WhatWeDo';
import './AboutUs.css'; 

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      {/* Background */}
      <div className="bg-background">

        <div className="about-us-container bg-background">
          {/* Team Component */}
          <Team />

    <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="about-content-container"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {/* Journey Section */}
            <div className="about-journey">
              <h2 className="text-3xl font-bold text-white mb-4">About Our Journey</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our journey in this hackathon has been both exciting and challenging. We have tackled problems from designing interactive web solutions
                to implementing real-time simulations. Our team thrives on curiosity and a love for exploration, which has driven us to participate in this
                prestigious event. With each challenge, we strive to go beyond what's expected and deliver results that are impactful and meaningful.
              </p>
            </div>

            <div className="about-challenge">
              <h2 className="text-3xl font-bold text-white mb-4">Our Challenge</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                The NASA Space Apps challenge tasked us with creating an interactive model of the solar system, commonly known as an orrery.
                Our web app displays celestial bodies, including planets, Near-Earth Asteroids, Near-Earth Comets, and Potentially Hazardous
                Asteroids. By combining our technical skills and passion for space exploration, we aim to deliver an immersive experience that
                educates and fascinates users about our universe.
              </p>
            </div>
          </motion.div>

          <WhatWeDo />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
