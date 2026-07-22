"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export const RevenueTrendChart: React.FC = () => {
  const data: RevenuePoint[] = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 62000 },
    { month: "Apr", revenue: 75000 },
    { month: "May", revenue: 98000 },
    { month: "Jun", revenue: 145000 },
  ];

  const formatYAxis = (val: number) => `$${val / 1000}k`;

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        Revenue Trend
      </h3>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

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
              tickFormatter={formatYAxis}
              domain={[0, 160000]}
              ticks={[0, 40000, 80000, 120000, 160000]}
            />

            <Tooltip
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "#0f2347",
                borderColor: "#1e3a6a",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 600,
              }}
              itemStyle={{ color: "#34d399" }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGreen)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
