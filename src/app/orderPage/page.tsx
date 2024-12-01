"use client";

import React from "react";
import Orders  from "../../components/Orders/orders"; 
import { Sidebar } from "../../components/Sidebar/Sidebar";

const OrderManagementPage = () => {
  return (
    <div className="grid grid-cols-[220px,_1fr] gap-4 p-4">
      <Sidebar /> 
      <Orders /> 
    </div>
  );
};

export default OrderManagementPage;
