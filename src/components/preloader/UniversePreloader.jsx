import React, { useEffect, useState } from 'react';

// Path to the sound file
import universeSound from '../../../public/sound.mp3'; // Your sound file

// Preloader Component
const UniversePreloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Play sound when component mounts
    const sound = new Audio(universeSound);
    sound.play();

    // Simulate loading time with a timeout (can be replaced with actual API call)
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      sound.pause(); // Stop sound when loading is done
    }, 3000); // Loading time is 5 seconds

    // Cleanup function to stop sound if the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
      sound.pause();
    };
  }, []);

  if (!loading) {
    return null; // If not loading, return nothing
  }

  return (
    <div className="universe-preloader min-h-screen bg-black flex items-center justify-center">
      <div className="expanding-universe relative">
        <div className="circle planet-1"></div>
        <div className="circle planet-2"></div>
        <div className="circle planet-3"></div>
        <div className="circle planet-4"></div>
        <h1 className="absolute text-white text-2xl font-bold mt-8">Loading Universe...</h1>
      </div>

      {/* Universe expanding animation */}
      <style jsx="true">{`
        .universe-preloader {
          position: relative;
          z-index: 50;
        }

        .expanding-universe {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .circle {
          border-radius: 50%;
          position: absolute;
          border: 2px solid white;
          animation: expand 3s infinite ease-in-out;
        }

        .planet-1 {
          width: 50px;
          height: 50px;
          animation-delay: 0.1s;
        }

        .planet-2 {
          width: 80px;
          height: 80px;
          animation-delay: 0.2s;
        }

        .planet-3 {
          width: 100px;
          height: 100px;
          animation-delay: 0.3s;
        }

        .planet-4 {
          width: 120px;
          height: 120px;
          animation-delay: 0.4s;
        }

        @keyframes expand {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UniversePreloader;
