import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import toast from 'react-hot-toast';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // State to track if the user is logged in and their data
    const [user, setUser] = useState(null);

    const cartItems = useSelector((store) => store.cart.items);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(() => {
    const fetchCartCount = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setCartCount(0);
            return;
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) return;

            const data = await response.json();

            setCartCount(data.length);

        } catch (err) {
            console.error("Cart count fetch failed:", err);
        }

    };

    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
        window.removeEventListener("cartUpdated", fetchCartCount);
    };

}, []);
    // Check local storage for user data when the header mounts
    useEffect(() => {

    const loadUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    };

    loadUser();

    window.addEventListener("userLoggedIn", loadUser);

    return () => {
        window.removeEventListener("userLoggedIn", loadUser);
    };

}, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setCartCount(0);
    // update UI
    window.dispatchEvent(new Event("userLoggedIn"));

    toast.success("Logged out successfully");

    navigate("/");
};

    return (
        <div className="flex justify-between items-center px-4 py-3 bg-white shadow-lg sticky top-0 z-50 md:px-8">
            
            <div className="flex items-center">
                <Link to="/"> 
                    <img
                        className="h-16 w-auto object-contain md:h-20"
                        src="https://img.freepik.com/premium-vector/minimalist-food-delivery-logo-design-modern-simple-branding-delivery-services_838011-283.jpg"
                        alt="FoodApp Logo"
                    />
                </Link>
            </div>

            <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            <div className={`absolute top-full left-0 w-full bg-white shadow-lg md:relative md:top-auto md:left-auto md:w-auto md:bg-transparent md:shadow-none ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
             
                <ul className="flex flex-col items-stretch w-full py-4 px-4 gap-y-2 text-sm font-medium md:flex-row md:flex-wrap md:items-center md:gap-x-2 md:gap-y-2 md:text-lg lg:gap-x-10 md:py-0 md:px-0">
                  
                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-200 rounded-md md:px-2 md:py-1 md:hover:bg-transparent">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-200 rounded-md md:px-2 md:py-1 md:hover:bg-transparent">
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    </li>
                    <li className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors duration-200 cursor-pointer flex items-center space-x-1
                                   transform hover:scale-105 transition-transform duration-200 ease-in-out md:px-3 md:py-1.5">
                        <Link to="/cart" className="flex items-center space-x-1" onClick={() => setIsMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.769.743 1.769H17m0 0A2 2 0 1020 18a2 2 0 00-3 0m-2 0a2 2 0 102 2 2 0 00-3 0" />
                            </svg>
                            <span>Cart ({cartCount} items)</span>
                        </Link>
                    </li>
                    
                    {/* Conditionally render Login OR User Profile & Logout */}
                    {user ? (
                        <li className="flex flex-col md:flex-row items-center gap-2">
                            {/* Display User Name */}
                            <span className="text-gray-700 font-semibold px-2">
                                Hi, {user.name.split(' ')[0]} {/* Shows first name */}
                            </span>
                            <button
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-md md:w-auto md:px-3 md:py-1.5"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 shadow-md md:w-auto md:px-3 md:py-1.5">
                                    Login
                                </button>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;