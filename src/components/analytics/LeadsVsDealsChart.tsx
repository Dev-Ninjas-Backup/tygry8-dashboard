"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface MonthData {
  month: string;
  totalLeads: number;
  closedDeals: number;
}

export const LeadsVsDealsChart: React.FC = () => {
  const data: MonthData[] = [
    { month: "Jan", totalLeads: 40, closedDeals: 5 },
    { month: "Feb", totalLeads: 30, closedDeals: 3 },
    { month: "Mar", totalLeads: 45, closedDeals: 6 },
    { month: "Apr", totalLeads: 50, closedDeals: 7 },
    { month: "May", totalLeads: 62, closedDeals: 9 },
    { month: "Jun", totalLeads: 82, closedDeals: 14 },
  ];

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        Leads vs Closed Deals
      </h3>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
              className="dark:stroke-slate-800"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f2347",
                borderColor: "#1e3a6a",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 600,
              }}
            />

            <Bar
              dataKey="totalLeads"
              name="Total Leads"
              fill="#8b9cb6"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="closedDeals"
              name="Closed Deals"
              fill="#0f2347"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#8b9cb6]" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Leads
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0f2347] dark:bg-blue-600" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Closed Deals
          </span>
        </div>
      </div>
    </div>
  );
};
