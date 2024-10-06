import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Profile = () => {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    localStorage.removeItem("token"); // Clear token from local storage
    navigate("/"); // Redirect to the login page
  };

  if (!user) {
    return (
      <div className="text-center text-white bg-black min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">No User Found</h2>
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative p-4 bg-black overflow-hidden pt-20 min-h-screen">
        {/* Background Animation */}
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg z-10 relative mt-10 max-w-md mx-auto h-auto">
          <h2 className="text-3xl font-bold text-gray-100">User Profile</h2>
          <div className="mt-4">
            <p className="text-gray-300"><strong>Full Name:</strong> {user.fullname}</p>
            <p className="text-gray-300"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-300"><strong>Registration Number:</strong> {user.registrationNumber}</p>
            <img src={user.userImage} alt="Profile" className="mt-4 w-24 h-24 rounded-full border-4 border-[#634da3]" />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 border border-[#634da3] text-[#634da3] hover:bg-[#634da3] hover:text-white transition duration-300 ease-in-out rounded-full px-4 py-2 font-bold"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
