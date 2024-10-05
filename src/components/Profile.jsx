import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Profile = () => {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">No User Found</h2>
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

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
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg z-10 relative mt-10 max-w-md mx-auto h-96">
          <h2 className="text-3xl font-bold text-gray-100">User Profile</h2>
          <div className="mt-4">
            <p className="text-gray-300"><strong>Full Name:</strong> {user.fullname}</p>
            <p className="text-gray-300"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-300"><strong>Registration Number:</strong> {user.registrationNumber}</p>
            <img src={user.userImage} alt="Profile" className="mt-4 w-24 h-24 rounded-full" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
