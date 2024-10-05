import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Auth = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [mode, setMode] = useState("signIn"); // "signIn" or "signUp"
  const [name, setName] = useState(""); // Default name
  const [email, setEmail] = useState(""); // Default email
  const [password, setPassword] = useState(""); // Default password
  const [registrationNumber, setRegistrationNumber] = useState(""); // Default registration number
  const [userImage, setUserImage] = useState(""); // Default user image URL

  const validateInputs = () => {
    if (mode === "signUp") {
      return name && email && password && registrationNumber && userImage;
    }
    return email && password;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await axios.post("http://localhost:8080/api/user/signup", {
          fullname: name,
          email,
          password,
          registrationNumber,
          userImage,
        });
        toast.success("Account Created Successfully");
        console.log("Response:", res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await axios.post("http://localhost:8080/api/user/login", {
          email,
          password,
        });
        toast.success("Login Success");
        console.log("Response:", res.data);
        
        // Redirect to home route after successful login
        navigate("/"); // Redirect to home
        
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="bg-black relative overflow-hidden pt-10">
        {/* Star background effect */}
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="bg-gray-900 min-h-screen flex justify-center items-start pt-0 lg:pt-10 w-full pt-10 mt-10">
          <div className="max-w-md bg-gray-800 p-8 rounded-lg shadow-lg z-10 relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 ">{mode === "signIn" ? "Welcome Back! 🩵" : "Create New Account 👋"}</h2>
              <p className="text-gray-600">{mode === "signIn" ? "Please login with your details here" : "Please enter your details to create a new account"}</p>
            </div>
            <div className="space-y-4">
              {mode === "signUp" && (
                <input
                  type="text"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "signUp" && (
                <>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                  <input
                    type="url"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="User Image URL"
                    value={userImage}
                    onChange={(e) => setUserImage(e.target.value)}
                  />
                </>
              )}
              <button
                onClick={mode === "signUp" ? handleSignUp : handleSignIn}
                disabled={buttonDisabled}
                className={`w-full p-3 mt-4 text-white bg-blue-600 rounded-md focus:outline-none ${
                  buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                {loading ? (mode === "signUp" ? "Signing Up..." : "Signing In...") : (mode === "signUp" ? "Sign Up" : "Sign In")}
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
                className="text-blue-600 hover:underline"
              >
                {mode === "signIn" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Auth;
