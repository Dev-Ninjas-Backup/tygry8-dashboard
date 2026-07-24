import { axiosInstance } from "../lib/axios";

export type OverviewPeriod = "7d" | "30d" | "90d" | "1y";

export interface OverviewMetrics {
  totalLeads: { value: number; changePercent: number };
  activePipeline: {
    value: number;
    dealCount: number;
    changePercent: number;
  };
  dealsClosed: { value: number; changePercent: number };
  avgCloseTime: { valueDays: number; changeDays: number };
}

export interface OverviewRevenuePoint {
  date: string;
  revenue: number;
  pipelineValue: number;
}

export interface OverviewConversionStage {
  key: string;
  label: string;
  count: number;
  percentage: number;
}

export interface OverviewRecentLead {
  id: string;
  leadNumber: string;
  sellerName: string;
  submittedAt: string;
  score: number;
  status: string;
  priority: string;
  estimatedValue: number | null;
  property: {
    street: string;
    city: string;
    state: string;
    title: string;
    imageUrl: string | null;
  } | null;
}

export interface OverviewAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  priority: string;
  leadId: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface OverviewResponse {
  metrics: OverviewMetrics;
  revenueTrend: OverviewRevenuePoint[];
  conversion: {
    windowDays: number;
    stages: OverviewConversionStage[];
  };
  recentLeads: OverviewRecentLead[];
  priorityAlerts: OverviewAlert[];
  period: OverviewPeriod;
}

export async function getOverview(
  period: OverviewPeriod = "30d",
): Promise<OverviewResponse> {
  const { data } = await axiosInstance.get("/api/overview", {
    params: { period },
  });
  return data?.data ?? data;
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `$${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(0)}k`;
  }
  return `$${Math.round(value).toLocaleString()}`;
}

export function formatSignedPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

export function formatSignedDays(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value} days`;
}
