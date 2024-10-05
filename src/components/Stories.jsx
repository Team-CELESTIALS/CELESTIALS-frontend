import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

// Sample data for space-related news
const newsArticles = [
  {
    title: "NASA's Artemis I Mission Successfully Returns to Earth",
    description: "NASA’s Artemis I mission successfully concluded with the Orion spacecraft splashing down in the Pacific Ocean.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aXZwXYtWHC75HBFBXgm8kQHaEK%26pid%3DApi&f=1&ipt=312cdfb1f1e8799658f2fa89c341e7e9f9c15f49eaa24786ec4b03389d4f1685&ipo=images", // Replace with an actual image URL
    link: "https://www.nasa.gov/artemis1", // Replace with the actual link
  },
  {
    title: "James Webb Space Telescope Reveals New Details of the Universe",
    description: "The James Webb Space Telescope has captured stunning new images of galaxies billions of light-years away.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DweqH97TVhgKo0UPMFhEKgHaEK%26pid%3DApi&f=1&ipt=404e7e8e66eb95d7a7019ee350f27419f17772e397b32ca0c2fb094231fcc16f&ipo=images", // Replace with an actual image URL
    link: "https://www.nasa.gov/webb", // Replace with the actual link
  },
  {
    title: "China's Lunar Rover Discovers New Minerals on Moon",
    description: "China’s lunar rover has discovered new minerals on the Moon's surface, shedding light on its geological history.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.kwZdHUQDJ3g8hjlsQZLA2QHaES%26pid%3DApi&f=1&ipt=29bb2257f87b52290ce533696b5950804360a9ae535972dd60cb56bf7864dce9&ipo=images", // Replace with an actual image URL
    link: "https://www.chinaspace.gov/lunar-rover", // Replace with the actual link
  },
];

const Stories = () => {
  return (
    <>
      <Navbar />
      <div className="relative p-4 bg-black overflow-hidden pt-20">
        {/* Background Animation */}
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
        <h1 className="text-3xl font-bold text-center pt-8 text-white bg-gray-900">Space News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-900 pb-20 pt-10 px-5">
          {newsArticles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-1000 hover:scale-105"
            >
              <div className="overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover transition-transform duration-1000 transform hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-4">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stories;
