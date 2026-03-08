import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast"; // Assuming you have this installed based on your Cart code!

const Contact = () => {
  // 1. Create state to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        // Clear the form
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Could not reach the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl w-full flex flex-col md:flex-row gap-12">
        
        {/* Left Section - Info + Links */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Feel free to reach out via this form or connect with me on GitHub and LinkedIn.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700 font-medium">
              📧 Email: <span className="text-gray-600">singhgurnoor283@gmail.com</span>
            </p>

            <div className="flex space-x-4 pt-4">
              <a href="https://github.com/SinghGurnoor283" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/gurnoor-singh-191029290/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1">
          {/* Add the onSubmit handler here */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name" // Added name attribute
                value={formData.name} // Connected to state
                onChange={handleChange} // Added onChange handler
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;