"use client";

import React, { useState } from "react";

// Define the structure for a reservation
type Reservation = {
  id: number;
  customerName: string;
  date: string;
  time: string;
  numberOfPersons: number;
  tableNumber: string;
  status: "Pending" | "Fulfilled";
};

const Reservations = () => {
  // Hardcoded sample reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      customerName: "Alice Johnson",
      date: "2024-12-02",
      time: "6:00 PM",
      numberOfPersons: 2,
      tableNumber: "A1",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Bob Smith",
      date: "2024-12-24",
      time: "7:00 PM",
      numberOfPersons: 4,
      tableNumber: "B3",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Clara Wilson",
      date: "2024-12-29",
      time: "5:00 PM",
      numberOfPersons: 3,
      tableNumber: "C5",
      status: "Pending",
    },
  ]);

  // Track reservations that are currently being "burst" out
  const [burstingReservations, setBurstingReservations] = useState<number[]>([]);

  // Handle toggling reservation status with burst effect
  const handleToggleStatus = (id: number) => {
    // Trigger burst animation
    setBurstingReservations((prev) => [...prev, id]);

    // Remove reservation after animation duration
    setTimeout(() => {
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
      setBurstingReservations((prev) => prev.filter((resId) => resId !== id));
    }, 500); // Duration of the burst animation
  };

  return (
    <div className="p-8 space-y-8 bg-green-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Reservations Management</h1>
        <p className="text-lg text-gray-600">Easily manage customer reservations</p>
      </div>

      {/* Reservations List */}
      <div className="space-y-6">
        {reservations.length === 0 ? (
          <p className="text-center text-gray-500">No reservations yet. Customers prefer to stay at home:(</p>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-between ${
                reservation.status === "Pending" ? "border-yellow-300 bg-yellow-100" : "border-green-300 bg-green-100"
              } ${
                burstingReservations.includes(reservation.id)
                  ? "animate-burst opacity-0"
                  : "opacity-100 transition-opacity"
              }`}
              style={{
                transition: "opacity 0.5s ease-out",
              }}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-green-700">{reservation.customerName}</h2>
                <p className="text-sm text-gray-600">Date: {reservation.date}</p>
                <p className="text-sm text-gray-600">Time: {reservation.time}</p>
                <p className="text-sm text-gray-600">Persons: {reservation.numberOfPersons}</p>
                <p className="text-sm text-gray-600">Table: {reservation.tableNumber}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleToggleStatus(reservation.id)}
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

export default Reservations;
