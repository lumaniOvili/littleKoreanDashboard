"use client";

import React from "react";
import Reservations from "../../components/Reservations/reservations"; 
import { Sidebar } from "../../components/Sidebar/Sidebar";

const ReservationManagementPage = () => {
  return (
    <div className="grid grid-cols-[220px,_1fr] gap-4 p-4">
      <Sidebar /> 
      <Reservations /> 
    </div>
  );
};

export default ReservationManagementPage;
