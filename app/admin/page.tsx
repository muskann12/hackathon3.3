"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // ✅ Admin Access Check
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin-login"); // 🔀 Unauthorized ko redirect kar do
      return;
    }

    // ✅ Orders Load karo (Agar LocalStorage use kar rahe ho)
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const handleDelete = (index: number) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save updated orders
  };

  const handleStatusChange = (index: number) => {
    const updatedOrders = [...orders];
    const currentStatus = updatedOrders[index].status;
    updatedOrders[index].status = currentStatus === "Pending" ? "Complete" : "Pending"; // Toggle status
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save updated orders
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel - Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders available.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 shadow-md rounded-lg border border-gray-200 transition-all hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Order #{index + 1}</h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStatusChange(index)}
                      className={`px-3 py-1 rounded-md ${
                        order.status === "Complete" ? "bg-green-500" : "bg-yellow-500"
                      } text-white hover:opacity-80`}
                    >
                      {order.status === "Complete" ? "Complete" : "Pending"}
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">Name: {order.userInfo.name}</p>
                <p className="text-sm text-gray-600">Email: {order.userInfo.email}</p>
                <p className="text-sm text-gray-600">Address: {order.userInfo.address}</p>
                <p className="text-sm text-gray-600">Contact: {order.userInfo.contact}</p>
                <p className="text-sm text-gray-800 font-bold">
                  Total: ${order.total ? order.total.toFixed(2) : "N/A"}
                </p>

                <h3 className="text-md font-semibold mt-4">Items:</h3>
                <ul className="text-gray-700">
                  {order.order.map((product: any, i: number) => (
                    <li key={i}>
                      {product.title} - {product.quantity} × ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("adminAuth"); // ✅ Logout
            router.push("/admin-login"); // 🔀 Redirect to Login
          }}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
