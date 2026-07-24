"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRevenueTrend } from "../../hooks/useAnalyticsQuery";

export const RevenueTrendChart: React.FC = () => {
  const { data = [], isLoading, isError, refetch } = useRevenueTrend("1y");

  const chartData = useMemo(() => {
    // Analytics page shows a 6-month monthly view; API returns monthly points for 1y.
    const monthly = data.slice(-6).map((point) => {
      const d = new Date(point.date);
      return {
        month: Number.isNaN(d.getTime())
          ? point.date
          : d.toLocaleString("en-US", { month: "short" }),
        revenue: point.revenue,
      };
    });
    return monthly;
  }, [data]);

  const yMax = useMemo(() => {
    const peak = chartData.reduce((max, row) => Math.max(max, row.revenue), 0);
    if (peak <= 0) return 160000;
    const step = Math.pow(10, Math.floor(Math.log10(peak)));
    return Math.ceil(peak / step) * step;
  }, [chartData]);

  const formatYAxis = (val: number) => `$${val / 1000}k`;

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        Revenue Trend
      </h3>

      <div className="h-64 sm:h-72 w-full pt-2">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            Loading revenue trend…
          </div>
        ) : isError ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-xs text-slate-400">
            <span>Couldn&apos;t load revenue trend.</span>
            <button
              type="button"
              onClick={() => void refetch()}
              className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No revenue data yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
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
                domain={[0, yMax]}
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value ?? 0).toLocaleString()}`,
                  "Revenue",
                ]}
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
        )}
      </div>
    </div>
  );
};
