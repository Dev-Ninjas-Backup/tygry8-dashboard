"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getOverview,
  OverviewPeriod,
} from "../services/overview.service";

export const OVERVIEW_QUERY_KEY = "overview";

export function useOverview(period: OverviewPeriod = "30d") {
  return useQuery({
    queryKey: [OVERVIEW_QUERY_KEY, period],
    queryFn: () => getOverview(period),
    staleTime: 30_000,
  });
}
