"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // ✅ Check if Admin is Logged In
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin-login"); // Redirect to Login Page
      return;
    }

    // ✅ Load Orders
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Admin Panel - Orders</h1>

        {orders.length === 0 ? (
          <p className="text-neutral-600">No orders available.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-sm rounded-lg border border-neutral-100"
              >
                <h2 className="text-lg font-semibold text-neutral-800">
                  Order #{index + 1}
                </h2>
                <p className="text-sm text-neutral-600">Name: {order.userInfo.name}</p>
                <p className="text-sm text-neutral-600">Email: {order.userInfo.email}</p>
                <p className="text-sm text-neutral-600">Address: {order.userInfo.address}</p>
                <p className="text-sm text-neutral-600">Contact: {order.userInfo.contact}</p>
                <p className="text-sm text-neutral-600 font-bold">Total: ${order.total.toFixed(2)}</p>

                <h3 className="text-md font-semibold mt-4">Items:</h3>
                <ul className="text-neutral-700">
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
            localStorage.removeItem("adminAuth"); // Logout
            router.push("/admin-login"); // Redirect to Login Page
          }}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
