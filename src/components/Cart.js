import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import toast from 'react-hot-toast';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {

    const loadCart = () => {

        const token = localStorage.getItem("token");

if (!token) {
  return (
    <div className="text-center mt-20 text-xl text-gray-600">
      Please login to view your cart 🛒
    </div>
  );
}
        if (token) {
            fetchCartFromDB();
        } 

    };

    loadCart();

    window.addEventListener("userLoggedIn", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
        window.removeEventListener("userLoggedIn", loadCart);
        window.removeEventListener("cartUpdated", loadCart);
    };

}, []);
    const fetchCartFromDB = async () => {

        try {

            const response = await fetch("http://localhost:5000/api/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) return;

            const data = await response.json();

           const formattedData = data.map(item => ({
                card: {
                    info: {
                    id: item.menu_item_id,
                    name: item.name,
                    price: item.price * 100,
                    category: item.category,
                    imageId: item.imageId,
                    description: item.description,
                    quantity: item.quantity // 👈 ADD THIS LINE
                    }
                }
                }));
        console.log("FORMATTED CART DATA:", formattedData);
            setCartItems(formattedData);

        } catch (err) {

            console.warn("Cart sync failed:", err.message);

        }

    };

    const handleClearcart = async () => {

        setCartItems([]);

        if (token) {

            try {

                const response = await fetch("http://localhost:5000/api/cart/clear", {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.ok) {
                    toast.success("Cart cleared everywhere!");
                }

            } catch (err) {

                toast.error("Could not clear database cart");

            }

        }

    };

    const totalPrice = cartItems.reduce((acc, item) => {
  return acc + (item.card.info.price * item.card.info.quantity);
}, 0);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl w-full mx-auto text-center mb-8">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4 flex justify-center items-center gap-2">
                    <span>🛒</span>
                    <span className="animate-bounce">Your Cart</span>
                </h1>

                <div className="text-lg text-gray-600 mb-4">
                    <p>
                        {cartItems.length} item(s) |
                        <span className="font-semibold text-green-600 ml-1">
                            ₹{(totalPrice / 100).toFixed(2)}
                        </span>
                    </p>
                </div>

                <button
                    onClick={handleClearcart}
                    className="bg-red-600 text-white px-6 py-2 rounded-full text-lg shadow hover:bg-red-700 transition active:scale-95"
                >
                    Clear Cart
                </button>

                {cartItems.length === 0 && (
                    <p className="mt-8 text-gray-500 text-xl italic">
                        Your Cart is empty. Add some delicious items!
                    </p>
                )}
            </div>

            <div className="max-w-3xl w-full mx-auto">
                <ItemList itemCards={cartItems} />
            </div>
        </div>
    );
};

export default Cart;