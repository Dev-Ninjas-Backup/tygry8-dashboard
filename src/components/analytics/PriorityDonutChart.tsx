"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface PrioritySegment {
  name: string;
  value: number;
  color: string;
}

export const PriorityDonutChart: React.FC = () => {
  const data: PrioritySegment[] = [
    { name: "High", value: 35, color: "#ef4444" },
    { name: "Medium", value: 42, color: "#f59e0b" },
    { name: "Low", value: 23, color: "#64748b" },
  ];

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        Priority Distribution
      </h3>

      <div className="h-64 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value: any, name: any) => [`${value} Leads`, `${name}`]}
              contentStyle={{
                backgroundColor: "#0f2347",
                borderColor: "#1e3a6a",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Highlight Badge matching the UI screenshot */}
        <div className="absolute pointer-events-none flex flex-col items-center justify-center">
          <span className="px-3 py-1 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-black text-slate-900 dark:text-white">
            High : 35
          </span>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-6 pt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
