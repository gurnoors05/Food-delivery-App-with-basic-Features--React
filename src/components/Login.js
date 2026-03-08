import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'; // Import the toast function
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const LoginForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  
  // State to hold the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To disable button during fetch

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLoginForm ? "/api/auth/login" : "/api/auth/register";
    const payload = isLoginForm ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${process.env.API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // 1. Handle Backend Errors Gracefully (No "throw new Error")
      if (!response.ok) {
        // Show the toast with the backend message (e.g., "Invalid password")
        toast.error(data.message || "Authentication failed.");
        setIsLoading(false);
        return; // Stop the function here so it doesn't run the success code below
      }

      // 2. Handle Success
      if (isLoginForm) {
        // --- SUCCESSFUL LOGIN ---
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("userLoggedIn"));

        toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
        navigate("/");
      } else {
        // --- SUCCESSFUL REGISTRATION ---
        toast.success("Account created successfully! Please log in.");
        setIsLoginForm(true); // Switch back to login view
        setPassword(""); // Clear password field
      }

    } catch (err) {
      // 3. This catch block now ONLY runs for real network crashes (e.g., backend is turned off)
      console.warn("Network error:", err);
      toast.error("Network error. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {isLoginForm ? "Welcome back" : "Create an Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginForm && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLoginForm}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text/password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow pr-10"
              />
              {/* The Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded font-semibold transition-all duration-300 ${
              isLoading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading 
              ? "Processing..." 
              : (isLoginForm ? "Login" : "Create Account")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 pt-4 border-t border-gray-100">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setPassword(""); // Clear password when switching
            }}
            className="text-orange-500 font-medium ml-2 hover:text-orange-600 hover:underline transition-colors"
          >
            {isLoginForm ? "Create Account" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;