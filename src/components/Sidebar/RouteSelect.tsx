"use client"; // Add this line to ensure the component is treated as a Client Component

import React from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiHome, FiLink, FiPaperclip, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Now it works in Client Components

export const RouteSelect = () => {
  const pathname = usePathname(); // Get the current route
  
  return (
    <div className="space-y-1">
      {/* Link to Dashboard */}
      <Route Icon={FiHome} selected={pathname === "/"} title="Dashboard" href="/" />

      {/* Link to Menu Management */}
      <Route
        Icon={FiUsers}
        selected={pathname === "/menu-management"}
        title="Menu Management"
        href="/menu-management"
      />


      {/* Link to Reservations */}
      <Route
        Icon={FiLink}
        selected={pathname === "/reservationPage"}
        title="Reservations"
        href="/reservationPage"
      />

      {/* Link to Orders */}
      <Route
        Icon={FiDollarSign}
        selected={pathname === "/orderPage"}
        title="Orders"
        href="/orderPage"
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  href,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  href: string; // Add href to the Route props
}) => {
  return (
    <Link href={href} passHref>
      {/* Wrap button inside Link */}
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};
