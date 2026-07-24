"use client";

import { useQuery } from "@tanstack/react-query";
import {
  analyticsService,
  AnalyticsPeriod,
} from "../services/analytics.service";

export const ANALYTICS_QUERY_KEY = "analytics";

export function useRevenueTrend(period: AnalyticsPeriod = "1y") {
  return useQuery({
    queryKey: [ANALYTICS_QUERY_KEY, "revenue-trend", period],
    queryFn: () => analyticsService.getRevenueTrend(period),
    staleTime: 60_000,
  });
}

export function useLeadsVsClosed() {
  return useQuery({
    queryKey: [ANALYTICS_QUERY_KEY, "leads-vs-closed"],
    queryFn: () => analyticsService.getLeadsVsClosed(),
    staleTime: 60_000,
  });
}

export function usePriorityDistribution() {
  return useQuery({
    queryKey: [ANALYTICS_QUERY_KEY, "priority-distribution"],
    queryFn: () => analyticsService.getPriorityDistribution(),
    staleTime: 60_000,
  });
}
