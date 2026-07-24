"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { usePriorityDistribution } from "../../hooks/useAnalyticsQuery";

const PRIORITY_META = [
  { key: "HIGH" as const, name: "High", color: "#ef4444" },
  { key: "MEDIUM" as const, name: "Medium", color: "#f59e0b" },
  { key: "LOW" as const, name: "Low", color: "#64748b" },
];

export const PriorityDonutChart: React.FC = () => {
  const { data, isLoading, isError, refetch } = usePriorityDistribution();

  const chartData = useMemo(
    () =>
      PRIORITY_META.map((item) => ({
        name: item.name,
        value: data?.[item.key] ?? 0,
        color: item.color,
      })),
    [data],
  );

  const highCount = data?.HIGH ?? 0;
  const total = chartData.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        Priority Distribution
      </h3>

      <div className="h-64 w-full flex items-center justify-center relative">
        {isLoading ? (
          <p className="text-xs text-slate-400">Loading priority distribution…</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
            <span>Couldn&apos;t load distribution.</span>
            <button
              type="button"
              onClick={() => void refetch()}
              className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : total === 0 ? (
          <p className="text-xs text-slate-400">No leads to distribute.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value ?? 0)} Leads`,
                    String(name ?? ""),
                  ]}
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
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute pointer-events-none flex flex-col items-center justify-center">
              <span className="px-3 py-1 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-black text-slate-900 dark:text-white">
                High : {highCount}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 pt-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {item.name}
              {!isLoading && !isError ? ` (${item.value})` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
