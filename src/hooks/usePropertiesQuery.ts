"use client";

import { useQuery } from "@tanstack/react-query";
import { propertiesService } from "../services/properties.service";

export const PROPERTIES_QUERY_KEY = "properties";

export function useProperties(params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, params],
    queryFn: () => propertiesService.getProperties(params),
    staleTime: 30_000,
  });
}

export function usePropertyDetail(id: string) {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, id],
    queryFn: () => propertiesService.getPropertyById(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}
