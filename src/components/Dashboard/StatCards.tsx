"use client"; 

import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import io from "socket.io-client"; // Import Socket.IO client

export const StatCards = () => {
  const [totalOrders, setTotalOrders] = useState("$120,054.24");
  const [avgOrder, setAvgOrder] = useState("$27.97");
  const [reservationRevenue, setReservationRevenue] = useState("$278,054.24");

  // Initialize Socket.IO client connection
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Connect to your backend socket server

    // Listen for real-time data updates from the server
    socket.on("statsUpdate", (data) => {
      setTotalOrders(data.totalOrders);  // Update state with received data
      setAvgOrder(data.avgOrder);
      setReservationRevenue(data.reservationRevenue);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // The empty array ensures this runs only once on mount

  return (
    <>
      <Card
        title="Total Orders"
        value={totalOrders}
        pillText="2.75%"
        trend="up"
        period="From Jan 1st - Dec 3rd"
      />
      <Card
        title="Avg Order"
        value={avgOrder}
        pillText="1.01%"
        trend="down"
        period="From Jan 1st - Dec 3rd"
      />
      <Card
        title="Reservation Revenue"
        value={reservationRevenue}
        pillText="60.75%"
        trend="up"
        period="From Jan 1st - Dec 3rd"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
