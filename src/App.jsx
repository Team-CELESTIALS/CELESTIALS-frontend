// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EarthDetails from "./components/GlobeComponent"; // Your detail components
import PlanetsDetails from "./components/PlanetsDetails";
import SolarSystemDetails from "./components/SolarSystemDetails";
import Contact from "./components/Contact";
import AsteroidGlobe from "./components/AsteroidComponent";
import Earth from "./components/Earth";
import AboutUs from "./pages/AboutUs/AboutUs";
import Stories from "./components/Stories";
import Team from "./components/Team";
import OrbitViewer from "./components/asteroid/OrbitViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earth-details" element={<EarthDetails />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/planets-details" element={<PlanetsDetails />} />
        <Route path="/solar-system-details" element={<SolarSystemDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/data-visualize" element={<AsteroidGlobe />} />
        <Route path="/orbit/:asteroidId" element={<OrbitViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
