import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // Importing social media icons
import { motion } from 'framer-motion'; // Importing Framer Motion for animations
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Dipa from '../assets/dipa-image.jpg';
import Asish from '../../public/Asish.jpg';
import manish from '../../public/manish.jpg';
import Jelina from '../../public/jelina.jpg';

// Sample data for team members with social media links
const teamMembers = [
  {
    name: "Pradip Bhatt",
    title: "FullStack Developer",
    image: "https://pradipbhatt.com.np/medias/parry.jpg",
    social: {
      twitter: "https://twitter.com/alicesmith",
      linkedin: "https://linkedin.com/in/alicesmith",
      github: "https://github.com/alicesmith",
      instagram: "https://instagram.com/alicesmith",
    },
  },
  {
    name: "Dipa Joshi",
    title: "Frontend Developer",
    image: Dipa,
    social: {
      twitter: ".",
      linkedin: "https://www.linkedin.com/in/dipa-joshi-548a79233/",
      github: "https://github.com/Dipajoshi",
      instagram: "https://www.instagram.com/dipajoc/",
    },
  },
  {
    name: "Manish Joshi",
    title: "Full Stack Developer",
    image: manish,
    social: {
      twitter: "https://twitter.com/charliebrown",
      linkedin: "https://linkedin.com/in/charliebrown",
      github: "https://github.com/charliebrown",
      instagram: "https://instagram.com/charliebrown",
    },
  },
  {
    name: "Asish Mehata",
    title: "UI/UX Designer",
    image: Asish,
    social: {
      twitter: "https://x.com/asishmehata47",
      linkedin: "https://linkedin.com/in/asishmehata48",
      github: "https://github.com/asishmehata48",
      instagram: "https://instagram.com/asishmehata48",
    },
  },
  {
    name: "Jelina Bhatt",
    title: "Tester",
    image: Jelina,
    social: {
      twitter: "https://twitter.com/evagreen",
      linkedin: "https://linkedin.com/in/evagreen",
      github: "https://github.com/evagreen",
      instagram: "https://instagram.com/evagreen",
    },
  },
  {
    name: "Manoj Joshi",
    title: "UI UX Designer",
    image: "https://avatars.githubusercontent.com/u/78907808?v=4",
    social: {
      twitter: "https://twitter.com/evagreen",
      linkedin: "https://linkedin.com/in/evagreen",
      github: "https://github.com/evagreen",
      instagram: "https://instagram.com/evagreen",
    },
  },
];

const Team = () => {
  return (
    <>
      {/* Background */}
      <div className="bg-black">
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
        <div className="bg-gray-900 min-h-screen flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold text-center mb-5 text-white pt-24">Meet Our Team</h1>
          
          {/* Team introduction content */}
          <p className="text-center text-lg text-gray-300 mb-8 px-4">
            We are Team Celestials, a passionate group of innovators participating in the NASA Space Apps Hackathon. Our goal is to 
            create solutions that have a lasting impact. Each member of our team brings a unique skill set, whether it's frontend 
            development, backend systems, testing, documentaion or full-stack expertise. Together, we push the boundaries of technology.
          </p>

          {/* Flexbox container for team members */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:bg-opacity-50 hover:shadow-lg hover:shadow-blue-500/50 w-80" // Set a consistent width for each card
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
                  <p className="text-gray-400 mb-4">{member.title}</p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-600 transition duration-300"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-600 transition duration-300"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-600 transition duration-300"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={member.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-600 transition duration-300"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
