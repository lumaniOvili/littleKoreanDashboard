"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

// Define the type for the traffic data
interface TrafficData {
  name: string;
  New: number;
  Returning: number;
  Orders: number;
  Traffic: number;
}

export const ActivityGraph = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]); // State with proper type
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Hardcoded traffic stats data
  useEffect(() => {
    const hardcodedData: TrafficData[] = [
      { name: "Day 1", New: 320, Returning: 50, Orders: 12, Traffic: 400 },
  { name: "Day 2", New: 90, Returning: 30, Orders: 5, Traffic: 150 },
  { name: "Day 3", New: 220, Returning: 80, Orders: 18, Traffic: 310 },
  { name: "Day 4", New: 400, Returning: 60, Orders: 22, Traffic: 500 },
  { name: "Day 5", New: 180, Returning: 150, Orders: 35, Traffic: 340 },
  { name: "Day 6", New: 50, Returning: 10, Orders: 2, Traffic: 80 },
  { name: "Day 7", New: 600, Returning: 200, Orders: 45, Traffic: 780 },
  { name: "Day 8", New: 300, Returning: 180, Orders: 25, Traffic: 560 },
  { name: "Day 9", New: 500, Returning: 50, Orders: 40, Traffic: 630 },
  { name: "Day 10", New: 40, Returning: 20, Orders: 3, Traffic: 70 },
  { name: "Day 11", New: 150, Returning: 300, Orders: 75, Traffic: 500 },
  { name: "Day 12", New: 420, Returning: 250, Orders: 100, Traffic: 760 },
  { name: "Day 13", New: 80, Returning: 120, Orders: 20, Traffic: 220 },
  { name: "Day 14", New: 700, Returning: 400, Orders: 90, Traffic: 980 },
  { name: "Day 15", New: 350, Returning: 50, Orders: 15, Traffic: 460 },
  { name: "Day 16", New: 900, Returning: 250, Orders: 120, Traffic: 1150 },
  { name: "Day 17", New: 100, Returning: 50, Orders: 10, Traffic: 180 },
  { name: "Day 18", New: 250, Returning: 600, Orders: 150, Traffic: 880 },
  { name: "Day 19", New: 850, Returning: 300, Orders: 95, Traffic: 1120 },
  { name: "Day 20", New: 670, Returning: 90, Orders: 45, Traffic: 900 },
  { name: "Day 21", New: 400, Returning: 500, Orders: 110, Traffic: 1000 },
  { name: "Day 22", New: 140, Returning: 30, Orders: 12, Traffic: 200 },
  { name: "Day 23", New: 310, Returning: 700, Orders: 180, Traffic: 1020 },
  { name: "Day 24", New: 900, Returning: 500, Orders: 200, Traffic: 1400 },
  { name: "Day 25", New: 200, Returning: 100, Orders: 30, Traffic: 350 },
  { name: "Day 26", New: 650, Returning: 400, Orders: 140, Traffic: 1000 },
  { name: "Day 27", New: 75, Returning: 25, Orders: 5, Traffic: 150 },
  { name: "Day 28", New: 1200, Returning: 700, Orders: 250, Traffic: 1750 },
  { name: "Day 29", New: 500, Returning: 80, Orders: 50, Traffic: 620 },
  { name: "Day 30", New: 320, Returning: 300, Orders: 100, Traffic: 720 },
    ];

    setTrafficData(hardcodedData); // Set the hardcoded data
    setIsLoading(false); // Set loading to false after setting data
  }, []); // Empty dependency array ensures this runs only once

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Website Traffic & Order Stats
        </h3>
      </div>

      <div className="h-72 px-4"> {/* Adjust height */} 
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trafficData} // Use the hardcoded traffic data
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#18181b"
              fill="#18181b"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke="#5b21b6"
              fill="#5b21b6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Orders"
              stroke="#1d4ed8"
              fill="#1d4ed8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Traffic"
              stroke="#ef4444"
              fill="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
