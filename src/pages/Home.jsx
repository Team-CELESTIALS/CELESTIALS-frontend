import React, { useState, useEffect } from "react";
import "../styles/background.css";
import "../styles/home.css";
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import Cards from "../components/Cards";
import Starfield from '../../src/components/preloader/Starfield'; // Import the Starfield component

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the preloader has been displayed before
    const preloaderShown = localStorage.getItem("preloaderShown");

    if (!preloaderShown) {
      const timeout = setTimeout(() => {
        setLoading(false);
        // Set in localStorage that the preloader has been shown
        localStorage.setItem("preloaderShown", "true");
      }, 3500); // 3.5 seconds for the loading

      return () => clearTimeout(timeout);
    } else {
      // If the preloader has been shown, set loading to false immediately
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Starfield /> 
      ) : (
        <>
          <Navbar />
          <div className="bg-black">
            <Cards />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
