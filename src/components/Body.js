import { Link } from 'react-router-dom';
import Restaurantcard from './Restaurantcard.js';
import { useState, useEffect } from 'react';
import MOCK_RESTAURANT_DATA from './utils/mockData';

// import Shimmer from './Shimmer.js';

import { FaGithub, FaLinkedin } from "react-icons/fa";
import useOnlineStatus from './useOnlineStatus.js';

const Body = () => {
    const [topRatedBtn, settopRatedBtn] = useState("Get Top Rated Restaurant");
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRes, setfilteredRes] = useState([]);
    const [searchText, setsearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // const data = await fetch("https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.9628669&lng=77.57750899999999&carousel=true&third_party_vendor=1");
        // const response = await data.json();
        // setListOfRestaurants(response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // setfilteredRes(response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // setListOfRestaurants(MOCK_RESTAURANT_DATA);
        // setfilteredRes(MOCK_RESTAURANT_DATA);


        try {
        const response = await fetch(`${process.env.API_URL ||  "http://localhost:5000"}/api/restaurants`);
        const dbData = await response.json();

        if (Array.isArray(dbData)) {
            const formattedData = dbData.map((restaurant) => ({
                info: {
                    id: restaurant.id,
                    name: restaurant.name,
                    cloudinaryImageId: restaurant.cloudinaryImageId,
                    cuisines: restaurant.cuisines, // keep as array
                    avgRating: restaurant.avgRating,
                    costForTwo: restaurant.costForTwo,
                    sla: restaurant.sla
                }
            }));

            setListOfRestaurants(formattedData);
            setfilteredRes(formattedData);
        } else {
            // Fallback to Mock Data if DB fails or returns error object
            console.warn("DB returned non-array data, falling back to mock.");
            setListOfRestaurants(MOCK_RESTAURANT_DATA);
            setfilteredRes(MOCK_RESTAURANT_DATA);
        }
    } catch (error) {
        console.error("Failed to fetch from database:", error);
        // Fallback to Mock Data on network error
        setListOfRestaurants(MOCK_RESTAURANT_DATA);
        setfilteredRes(MOCK_RESTAURANT_DATA);
    }
    };

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) {
        return (
            <h1>Oops!! Something went wrong!! Please check your internet connection</h1>
        );
    }

    return (
        <div className="w-full bg-gray-50">

            <div className="flex flex-col md:flex-row justify-start items-center px-3 py-3 gap-4 mt-2">
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setsearchText(e.target.value)}
                        placeholder="Search restaurants..."
                        className="px-4 py-2 w-full sm:w-64 text-gray-900 font-medium rounded-lg border border-gray-300 focus:outline-none focus:ring-2 shadow-sm transition duration-300"
                    />

                    <button
                        onClick={() => {
                            const filteredRes = listOfRestaurants.filter((res) =>
                                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setfilteredRes(filteredRes);
                        }}
                        className="px-5 py-2 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-100 transition duration-300 shadow-md w-full sm:w-auto"
                    >
                        🔍 Search
                    </button>

                    <button
                        onClick={() => {
                            if (topRatedBtn === "Get Top Rated Restaurant") {
                                settopRatedBtn("Get Full List");
                                const filteredList = listOfRestaurants.filter(
                                    (res) => res.info.avgRating >= 4.5
                                );
                                setfilteredRes(filteredList);
                            } else {
                                settopRatedBtn("Get Top Rated Restaurant");
                                setfilteredRes(listOfRestaurants);
                            }
                        }}
                        className="px-5 py-2 bg-blue-400 text-black font-semibold rounded-lg hover:bg-blue-100 transition duration-300 shadow-md w-full sm:w-auto"
                    >
                        🌟 {topRatedBtn}
                    </button>
                </div>
            </div>

         
        <div className="my-9 w-[92%] md:w-[85%] lg:w-[90%] mx-auto rounded-[36px] overflow-hidden relative">
            <img
                className="w-full h-auto object-cover rounded-[36px]"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/Food_collectionbanner.png"
                alt="Food Banner"
            />

            <div className="absolute inset-0 flex items-end sm:items-end justify-start px-4 sm:px-8 pb-4 sm:pb-8">
                <div className="text-white text-left">
                <h1 className="text-base sm:text-2xl md:text-3xl font-bold leading-tight mb-1 sm:mb-2">
                    Order Online Delivery
                </h1>
                <p className="text-sm sm:text-xl md:text-2xl font-semibold">
                    Restaurants Near Me
                </p>
                </div>
            </div>
            </div>







           <div className="mt-6 px-4 py-6 sm:px-6 sm:py-8">
        <h2 className="text-2xl font-bold mb-4 ml-2 sm:ml-0">What's on your mind?</h2>
        
        <div className="flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 pb-4">
          {filteredRes.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="transition-transform transform hover:scale-105"
            >
              <Restaurantcard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>


                <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
                  
                    <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">FoodDeliveryApp</h3>
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
                    </div>

                  
                    <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/cart" className="hover:text-white transition-colors duration-200">Check Your Cart</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                    </ul>
                    </div>

                    <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://www.linkedin.com/in/gurnoor-singh-191029290/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                    
                        <FaLinkedin size={30} className="h-6 w-6" />
                        </a>
                        <a href="https://github.com/SinghGurnoor283" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                       
                       
                        <FaGithub className="h-6 w-6" />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
                    Designed and Developed by Gurnoor Singh
                </div>
                </div>
            </footer>
        </div>
    );
};

export default Body;
