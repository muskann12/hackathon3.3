"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Product {
  title: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart:", error);
        setCart([]);
      }
    }
    setIsLoading(false);
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = subtotal > 200 ? 0 : 15;
    return subtotal + shippingFee;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.address || !userInfo.contact) {
      toast.error("Please fill out all the fields.");
      return;
    }

    // Save order details for admin panel (localStorage example)
    const orderDetails = {
      userInfo,
      order: cart,
      total: calculateTotal(),
    };

    // Save to localStorage (or send to API/backend)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderDetails]));

    toast.success("Order placed successfully!");

    // Clear cart after placing the order
    localStorage.removeItem("cart");
    setCart([]);

    // Redirect to home page after a brief delay
    setTimeout(() => {
      router.push("/"); // Navigate to the home page
    }, 1500); // 1.5-second delay to let the toast display
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
          >
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Order Summary</h2>

            {cart.map((product) => (
              <div
                key={product.title}
                className="flex justify-between items-center mb-4 text-neutral-700"
              >
                <p>{product.title}</p>
                <p>${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="h-px bg-neutral-100 my-4"></div>

            <div className="flex justify-between text-neutral-600 mb-2">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-neutral-600 mb-2">
              <span>Shipping</span>
              <span>{calculateSubtotal() > 200 ? "Free" : "$15.00"}</span>
            </div>

            <div className="flex justify-between text-lg font-medium text-neutral-800">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Shipping Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
          >
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Shipping Details</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="border border-neutral-300 rounded-md p-2 w-full"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="border border-neutral-300 rounded-md p-2 w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  className="border border-neutral-300 rounded-md p-2 w-full"
                  placeholder="Enter your shipping address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={userInfo.contact}
                  onChange={handleInputChange}
                  className="border border-neutral-300 rounded-md p-2 w-full"
                  placeholder="Enter your contact number"
                />
              </div>
            </form>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-4 rounded-full hover:bg-neutral-800 transition-colors duration-300 mt-6"
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
