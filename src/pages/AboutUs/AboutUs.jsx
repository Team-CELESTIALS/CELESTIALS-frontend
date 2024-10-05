import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './AboutUs.css'; // Importing the CSS for AboutUs page

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
      <div className="bg-black">
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="about-us-container bg-gray-900">
          <section className="about-us-content">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1.0 }}  // Extended duration for smoothness
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }} // Poppins Bold for heading
            >
              Team-CELESTIALS
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1.0, delay: 0.2 }}  // Extended delay for staggered effect
              className="about-members"
              style={{ fontFamily: 'Montserrat, sans-serif' }} // Keep the body text as Montserrat
            >
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>About Members</h2>
              <p>
                We're passionate computer engineers from the far western side of Mahendranagar, 
                eager to innovate and learn new things by creating groundbreaking solutions. 
                Our team consists of a frontend master, backend master, app developer, and a full-stack developer.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1.0, delay: 0.4 }}  // Extended delay for smoother stagger
              className="about-team"
              style={{ fontFamily: 'Montserrat, sans-serif' }} // Keep the body text as Montserrat
            >
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>About the Team</h2>
              <p>
                Our team has experience participating in these kinds of challenges, and we're always excited to tackle 
                new problems with fresh perspectives. We're driven by a passion for learning and pushing the boundaries 
                of what's possible. If you're a participant who loves to explore, innovate, and collaborate, we invite you 
                to join us on this journey toward creating impactful solutions!
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1.0, delay: 0.6 }}  // Extended delay for smoother stagger
              className="about-challenge"
              style={{ fontFamily: 'Montserrat, sans-serif' }} // Keep the body text as Montserrat
            >
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>About the Challenge</h2>
              <p>
                Since a mechanical model of the solar system was presented to Charles Boyle, 4th Earl of Orrery, in 1713, such models 
                have been referred to as orreries. The first orreries were physical models, but today we can use numerous tools to 
                create virtual orreries that have many more features than their ancient mechanical counterparts. Our challenge is to 
                create an interactive orrery web app that is embedded in a webpage and displays celestial bodies such as planets, 
                Near-Earth Asteroids, Near-Earth Comets, and Potentially Hazardous Asteroids.
              </p>
            </motion.div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
