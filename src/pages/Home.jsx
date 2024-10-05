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
    // Check if the loader has been shown before
    const hasLoadedBefore = localStorage.getItem("hasLoadedBefore");

    if (!hasLoadedBefore) {
      // Show the preloader for 5 seconds on the first load
      const timeout = setTimeout(() => {
        setLoading(false);
        // Set the flag in localStorage so it doesn't show again
        localStorage.setItem("hasLoadedBefore", "true");
      }, 5000); // 5 seconds for the loading

      return () => clearTimeout(timeout);
    } else {
      // If already loaded, skip the preloader
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
