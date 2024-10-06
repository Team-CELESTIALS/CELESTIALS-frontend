import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use EmailJS to send the email
    emailjs.send('service_rpl4n2n', 'template_z8orwi3', formData, 'gA2JhY7UkblAK_HIT')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        toast.success('Email sent successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setIsSubmitted(true); // Set submitted state to true
        setFormData({ name: '', email: '', query: '' }); // Clear the form
      }, (error) => {
        console.error('Failed to send email. Error:', error);
        toast.error('Failed to send email. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };

  const handleResend = () => {
    setIsSubmitted(false); // Reset submission status
    setFormData({ name: '', email: '', query: '' }); // Reset the form
  };

  return (
    <>
      <Navbar />
      <div>
        {/* Background */}
        <div className="bg-black relative overflow-hidden">

          <div className="bg-background min-h-screen flex justify-center items-center pt-0 lg:pt-10 w-full">
            {!isSubmitted ? ( // Check if form is submitted
              <form
                onSubmit={handleSubmit}
                className=" w-full lg:w-1/2 mx-auto bg-transparent px-8 rounded-lg shadow-2xl z-10 relative"
              >
                <h1 className="text-4xl font-bold text-center mb-8 text-white">Contact Us</h1>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="query" className="block text-white mb-2">Your Query</label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    placeholder="Type your query here"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="max-w-lg mx-auto bg-transparent p-8 rounded-lg shadow-2xl z-10 relative text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h1>
                <p className="text-white mb-4">Thank you for contacting us. We will get back to you soon!</p>
                <button
                  onClick={handleResend}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Resend Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Contact;
