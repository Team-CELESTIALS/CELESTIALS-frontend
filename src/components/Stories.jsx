import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Stories = () => {
  const [newsArticles, setNewsArticles] = useState([]); // State to hold news articles
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const response = await fetch("https://teamcelestials.vercel.app/api/post");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsArticles(data); // Set fetched articles to state
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      } finally {
        setLoading(false); // Update loading status
      }
    };

    fetchNewsArticles();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Loading Articles...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative p-4 bg-background overflow-hidden pt-20">
        {/* Background Animation */}
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
        <h1 className="text-3xl font-bold text-center pt-8 text-white bg-background">Space News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-background pb-20 pt-10 px-5">
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
