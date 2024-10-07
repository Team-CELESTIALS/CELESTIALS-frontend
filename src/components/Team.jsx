import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // Importing social media icons
import { motion } from 'framer-motion'; // Importing Framer Motion for animations
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Dipa from '../assets/dipa-image.jpg';
import Asish from '../../public/asish.jpeg';
import manish from '../../public/manish.jpg';
import Jelina from '../../public/jelina.jpeg';

// Sample data for team members with social media links
const teamMembers = [
  {
    name: "Pradip Bhatt",
    title: "FullStack Developer",
    image: "https://pradipbhatt.com.np/medias/parry.jpg",
    social: {
      twitter: ".",
      linkedin: "https://www.linkedin.com/in/pradipbhatt1326/",
      github: "https://github.com/pradipbhatt",
      instagram: "https://instagram.com/pradipbhatt3",
    },
  },
  {
    name: "Dipa Joshi",
    title: "Tester",
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
      twitter: ".",
      linkedin: "https://linkedin.com/in/manish-joshi-9762b2304/",
      github: "https://github.com/ManishJoc14",
      instagram: ".",
    },
  },
  {
    name: "Asish Mehata",
    title: "UI/UX Designer",
    image: Asish,
    social: {
      twitter: "https://x.com/asishmehata77",
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
      twitter: ".",
      linkedin: "https://www.linkedin.com/in/jelina-bhatt-2384472b4/",
      github: "https://github.com/jelina-bhatt",
      instagram: "https://instagram.com/jelinabhatt",
    },
  },
  {
    name: "Manoj Joshi",
    title: "UI UX Designer",
    image: "https://avatars.githubusercontent.com/u/78907808?v=4",
    social: {
      twitter: ".",
      linkedin: "https://www.linkedin.com/in/manoj-joshi-6b7662166/",
      github: "https://github.com/manoj-here",
      instagram: ".",
    },
  },
];

const Team = () => {
  return (
    <>
      {/* Background */}
      <div className="bg-background">

        <div className="bg-background min-h-screen flex flex-col items-center pb-10">
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
                className="text-white rounded-lg overflow-hidden shadow-lg backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:bg-opacity-50 hover:shadow-lg hover:shadow-primary-dim w-80" // Set a consistent width for each card
                style={{ background: '#ffffff12'}}
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
                      className="text-primary-light hover:text-primary-dim transition duration-300"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-light hover:text-primary-dim transition duration-300"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-light hover:text-primary-dim transition duration-300"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-light hover:text-primary-dim transition duration-300"
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
