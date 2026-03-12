import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const ItemList = ({ itemCards }) => {

        const [cartItems, setCartItems] = useState([]);

        if (!Array.isArray(itemCards)) return null;

        // const token = localStorage.getItem("token");
        const { user } = useContext(AuthContext);
        const token = localStorage.getItem("token");

        const fetchCart = async () => {
          const token = localStorage.getItem("token");
            if (!token) return;

            try {

              const res = await fetch(`${process.env.API_URL || "http://localhost:5000"}/api/cart`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              const data = await res.json();

              setCartItems(data);

            } catch (err) {
              console.error("Cart fetch error", err);
            }
        };

        useEffect(() => {
          if (!user) {
            setCartItems([]);
            return;
          }

          fetchCart();
          fetchCart();
          window.dispatchEvent(new Event("cartUpdated"));
        }, [user]);

      const getQuantity = (itemId) => {
        // Return 0 immediately if cartItems somehow isn't an array
        if (!Array.isArray(cartItems)) return 0;

        const item = cartItems.find(
          i => String(i.menu_item_id) === String(itemId)
        );

        return item ? item.quantity : 0;
      };

  const handleaddItem = async (items) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const info = items?.card?.info || items;

    const itemId = info?.id || info?.menu_item_id;

    await fetch(`${process.env.API_URL || "http://localhost:5000"}/api/cart/add`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        menu_item_id: itemId,
        name: info?.name,
        price: (info?.price || info?.defaultPrice) / 100,
        category: info?.category,
        imageId: info?.imageId,
        description: info?.description
      })

    });

    fetchCart();
    fetchCart();
window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseItem = async (itemId) => {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.API_URL || "http://localhost:5000"}/api/cart/increase/${itemId}`, {

      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`
      }

    });

    fetchCart();
    fetchCart();
window.dispatchEvent(new Event("cartUpdated"));
  };

  const decreaseItem = async (itemId) => {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.API_URL || "http://localhost:5000"}/api/cart/decrease/${itemId}`, {

      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`
      }

    });

    fetchCart();
    fetchCart();
window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div>

      {itemCards.map((items, index) => {

        const info = items?.card?.info || items;

        const itemId = info?.id || info?.menu_item_id;

        const quantity = getQuantity(itemId);

        const price = (info?.price || info?.defaultPrice) / 100;

        return (

          <div
            key={`${itemId}-${index}`}
            className="p-4 m-4 border-b-1 text-left flex justify-between items-start"
          >

            <div className="w-9/12 pr-4">

              <div className="py-1">

                <span className="font-semibold">{info?.name}</span>

                <span className="font-medium">
                  {" "} - ₹{price * (quantity || 1)}
                </span>

              </div>

              <p className="text-xs text-gray-500">
                {info?.description}
              </p>

            </div>

            <div className="w-3/12 relative">

              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                  info?.imageId
                }
                className="w-36 h-32 object-cover rounded-lg"
              />
              
              <div className="absolute bottom-1 right-4">

                {quantity > 0 ? (

                  <div className="flex items-center bg-white border rounded-md">

                    <button
                      onClick={() => decreaseItem(itemId)}
                      className="px-2 text-lg text-red-500"
                    >
                      -
                    </button>

                    <span className="px-2">{quantity}</span>

                    <button
                      onClick={() => increaseItem(itemId)}
                      className="px-2 text-lg text-green-500"
                    >
                      +
                    </button>

                  </div>

                ) : (

                  <button
                    className="bg-white border border-gray-300 rounded-md px-3.5 py-0.9 text-green-600 font-bold hover:shadow-md"
                    onClick={() => handleaddItem(items)}
                  >
                    ADD
                  </button>

                )}

              </div>

            </div>

          </div>

        );

      })}

    </div>
  );

};

export default ItemList;