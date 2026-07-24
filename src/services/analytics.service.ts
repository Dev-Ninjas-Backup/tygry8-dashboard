import { axiosInstance } from "../lib/axios";

export type AnalyticsPeriod = "7d" | "30d" | "90d" | "1y";

export interface RevenueTrendPoint {
  date: string;
  revenue: number;
  pipelineValue: number;
}

export interface LeadsVsClosedPoint {
  month: string;
  totalLeads: number;
  closedDeals: number;
}

export interface PriorityDistribution {
  HIGH: number;
  MEDIUM: number;
  LOW: number;
}

async function unwrap<T>(promise: Promise<{ data: unknown }>): Promise<T> {
  const { data } = await promise;
  const body = data as { data?: T } | T;
  if (body && typeof body === "object" && "data" in body && body.data !== undefined) {
    return body.data as T;
  }
  return body as T;
}

export const analyticsService = {
  getRevenueTrend(period: AnalyticsPeriod = "1y") {
    return unwrap<RevenueTrendPoint[]>(
      axiosInstance.get("/api/analytics/revenue-trend", { params: { period } }),
    );
  },

  getLeadsVsClosed() {
    return unwrap<LeadsVsClosedPoint[]>(
      axiosInstance.get("/api/analytics/leads-vs-closed"),
    );
  },

  getPriorityDistribution() {
    return unwrap<PriorityDistribution>(
      axiosInstance.get("/api/analytics/priority-distribution"),
    );
  },
};
