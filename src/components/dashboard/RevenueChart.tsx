"use client";

import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";
import type {
  OverviewPeriod,
  OverviewRevenuePoint,
} from "../../services/overview.service";

const PERIOD_OPTIONS: OverviewPeriod[] = ["7d", "30d", "90d", "1y"];

function formatAxisLabel(dateIso: string, period: OverviewPeriod): string {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  if (period === "1y") {
    return d.toLocaleString("en-US", { month: "short" });
  }
  return d.toLocaleString("en-US", { month: "short", day: "numeric" });
}

function toChartUnits(value: number): number {
  return Math.round(value / 1000);
}

interface RevenueChartProps {
  data?: OverviewRevenuePoint[];
  period?: OverviewPeriod;
  onPeriodChange?: (period: OverviewPeriod) => void;
  isLoading?: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data = [],
  period = "30d",
  onPeriodChange,
  isLoading = false,
}) => {
  const [localPeriod, setLocalPeriod] = useState<OverviewPeriod>(period);
  const activePeriod = onPeriodChange ? period : localPeriod;

  const chartData = useMemo(
    () =>
      data.map((point) => ({
        name: formatAxisLabel(point.date, activePeriod),
        revenue: toChartUnits(point.revenue),
        pipeline: toChartUnits(point.pipelineValue),
        rawRevenue: point.revenue,
        rawPipeline: point.pipelineValue,
      })),
    [data, activePeriod],
  );

  const yMax = useMemo(() => {
    const peak = chartData.reduce(
      (max, row) => Math.max(max, row.revenue, row.pipeline),
      0,
    );
    if (peak <= 100) return 100;
    return Math.ceil(peak / 100) * 100;
  }, [chartData]);

  const handlePeriodClick = (option: OverviewPeriod) => {
    if (onPeriodChange) {
      onPeriodChange(option);
    } else {
      setLocalPeriod(option);
    }
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Revenue,Pipeline Value\n" +
      chartData
        .map(
          (row) =>
            `${row.name},$${row.rawRevenue},$${row.rawPipeline}`,
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `revenue_pipeline_${activePeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Revenue & Pipeline Analytics
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Track your deal flow and closed revenue over time.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handlePeriodClick(option)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all uppercase cursor-pointer ${
                  activePeriod === option
                    ? "bg-[#0f2347] text-white shadow-xs dark:bg-blue-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={chartData.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            Loading chart…
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No revenue data for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f2347" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f2347" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                className="dark:stroke-slate-800"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                tickFormatter={(value) => `$${value}k`}
                domain={[0, yMax]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
                }}
                formatter={(value) => [
                  `$${Number(value ?? 0)}k`,
                  "",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#0f2347"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />

              <Area
                type="monotone"
                dataKey="pipeline"
                name="Pipeline Value"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPipeline)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0f2347] dark:bg-blue-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Revenue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2563eb]" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Pipeline Value
          </span>
        </div>
      </div>
    </div>
  );
};
