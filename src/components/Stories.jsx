import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "../styles/stories.css";
import UniversePreloader from "../components/preloader/Starfield"; // Import the Preloader

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
    // Display the UniversePreloader while loading
    return <UniversePreloader />;
  }

  return (
    <>
      <Navbar />
      <div className="relative p-4 bg-background overflow-hidden pt-20">
        <h1 className="text-3xl font-bold text-center pt-8 text-white bg-background">Space News</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-background pb-20 pt-10 px-5">
          {newsArticles.map((article, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 stories-card"
            >
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4 relative pb-14">
                <h2 className="text-xl font-semibold text-white mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-4">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#634da3] text-white px-4 py-2 rounded hover:bg-[#533b92] transition absolute bottom-5"
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
