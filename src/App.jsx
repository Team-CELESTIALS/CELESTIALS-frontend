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
import Signup from "../src/components/Auth";
import Profile from "./components/Profile";
import Admin from "./Admin";
import AsteroidCard from '../src/components/asteroid/AsteroidComponent';


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
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/data-visualize" element={<AsteroidGlobe />} />
        <Route path="/astroid-card" element={<AsteroidCard/>} />
        <Route path="/orbit/:asteroidId" element={<OrbitViewer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
