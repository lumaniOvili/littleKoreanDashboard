"use client";

import React, { useState } from "react";

// Define the structure for an order
type Order = {
  id: number;
  customerName: string;
  item: string;
  status: "Pending" | "Fulfilled";
  totalAmount: number;
};

// Menu items from the provided menu
const menuItems = [
  {
    name: "Chicken, Pork, or Vegetable Dumpling (6pcs)",
    price: 6.95,
  },
  {
    name: "Vegetarian Spring Rolls (5pcs)",
    price: 6.95,
  },
  {
    name: "Sundubu Jjigae",
    price: 17.95,
  },
  {
    name: "Kimchi Jjigae",
    price: 17.95,
  },
  {
    name: "Gamjatang",
    price: 16.95,
  },
  {
    name: "Soondae Gukbob",
    price: 18.95,
  },
  {
    name: "Galbi Tang",
    price: 18.95,
  },
];

const OrdersManagement = () => {
  // Initialize orders with menu items
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: "John Doe",
      item: "Chicken, Pork, or Vegetable Dumpling (6pcs)",
      status: "Pending",
      totalAmount: 6.95,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      item: "Sundubu Jjigae",
      status: "Pending",
      totalAmount: 17.95,
    },
    {
      id: 3,
      customerName: "Emma Johnson",
      item: "Vegetarian Spring Rolls (5pcs)",
      status: "Pending",
      totalAmount: 6.95,
    },
  ]);

  // Track orders that are currently being "burst" out
  const [burstingOrders, setBurstingOrders] = useState<number[]>([]);

  // Handle toggling order status with burst effect
  const handleToggleStatus = (id: number) => {
    // Trigger burst animation
    setBurstingOrders((prev) => [...prev, id]);

    // Remove order after animation duration
    setTimeout(() => {
      setOrders((prev) => prev.filter((order) => order.id !== id));
      setBurstingOrders((prev) => prev.filter((orderId) => orderId !== id));
    }, 500); // Duration of the burst animation
  };

  return (
    <div className="p-8 space-y-8 bg-green-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Orders Management</h1>
        <p className="text-lg text-gray-600">
          Manage and update customer orders efficiently
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">
            No orders yet. We better up the advertisement!
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-between ${
                order.status === "Pending"
                  ? "border-yellow-300 bg-yellow-100"
                  : "border-green-300 bg-green-100"
              } ${
                burstingOrders.includes(order.id)
                  ? "animate-burst opacity-0"
                  : "opacity-100 transition-opacity"
              }`}
              style={{
                transition: "opacity 0.5s ease-out",
              }}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-green-700">
                  {order.customerName}
                </h2>
                <p className="text-sm text-gray-600">Item: {order.item}</p>
                <p className="text-sm text-gray-600">
                  Amount: ${order.totalAmount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Fulfilled"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleToggleStatus(order.id)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  Fulfilled
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CSS for burst effect */}
      <style jsx>{`
        @keyframes burst {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-burst {
          animation: burst 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrdersManagement;
