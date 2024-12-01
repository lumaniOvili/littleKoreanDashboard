"use client";

import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

interface Order {
  _id: number;
  customerName: string;
  totalAmount: number;
}

interface Reservation {
  _id: number;
  customerName: string;
  reservationTime: string;
}

export const TopBar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([
    { _id: 1, customerName: "John Doe", totalAmount: 25.5 },
  ]); // Hardcoded pending orders
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([
    { _id: 1, customerName: "Alice Johnson", reservationTime: "6:00 PM" },
  ]); // Hardcoded pending reservations

  // Dynamically get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Function to toggle calendar dropdown
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Function to mark an order as fulfilled
  const fulfillOrder = (orderId: number) => {
    setPendingOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Greeting Section */}
        <div>
          <span className="text-sm font-bold block">🚀 Hi littleKorean!</span> {/* Updated greeting */}
          <span className="text-xs block text-stone-500">{formattedDate}</span>
          <span className="text-xs block text-stone-500">{formattedTime}</span> {/* Show time */}
        </div>

        {/* Calendar Button */}
        <div className="relative">
          <button
            onClick={toggleCalendar}
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiCalendar />
            <span>Today's Date & Pending Orders/Reservations</span>
          </button>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded shadow-lg p-4">
              {/* Show today's date and time */}
              <h4 className="text-center text-sm font-bold mb-2">
                {formattedDate} - {formattedTime}
              </h4>

              {/* Pending Orders Message */}
              <h5 className="mt-4 text-sm font-semibold">Pending Orders:</h5>
              {pendingOrders.length > 0 ? (
                <p className="mt-2 text-xs">
                  We have {pendingOrders.length} order{pendingOrders.length > 1 ? "s" : ""}.
                </p>
              ) : (
                <p className="mt-2 text-xs text-stone-500">All orders fulfilled!</p>
              )}

              {/* Pending Orders List */}
              <ul className="mt-2 space-y-2 text-xs">
                {pendingOrders.map((order) => (
                  <li key={order._id} className="text-stone-600 flex justify-between items-center">
                    Order #{order._id} - {order.customerName} (Total: ${order.totalAmount.toFixed(2)})
                    <button
                      onClick={() => fulfillOrder(order._id)}
                      className="text-xs text-blue-500 hover:text-blue-700 ml-2"
                    >
                      Fulfilled
                    </button>
                  </li>
                ))}
              </ul>

              {/* Pending Reservations List */}
              <h5 className="mt-4 text-sm font-semibold">Pending Reservations:</h5>
              <ul className="mt-2 space-y-2 text-xs">
                {pendingReservations.length > 0 ? (
                  pendingReservations.map((reservation) => (
                    <li key={reservation._id} className="text-stone-600">
                      Reservation #{reservation._id} - {reservation.customerName} ({reservation.reservationTime})
                    </li>
                  ))
                ) : (
                  <li className="text-stone-500">No pending reservations</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

