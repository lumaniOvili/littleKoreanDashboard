"use client";

import React from "react";
import { MenuManagement } from "../../components/MenuManagement/MenuManagement"; 
import { Sidebar } from "../../components/Sidebar/Sidebar";
const MenuManagementPage = () => {
  return (
    <div className="grid grid-cols-[220px,_1fr] gap-4 p-4">
      <Sidebar /> 
      <MenuManagement /> 
    </div>
  );
};
export default MenuManagementPage;
