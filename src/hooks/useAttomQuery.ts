"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attomService } from "../services/attom.service";

export const ATTOM_QUERY_KEY = "attom";

export function useAttomStats() {
  return useQuery({
    queryKey: [ATTOM_QUERY_KEY, "stats"],
    queryFn: () => attomService.getStats(),
    staleTime: 30_000,
  });
}

export function useAttomEnrichments() {
  return useQuery({
    queryKey: [ATTOM_QUERY_KEY, "list"],
    queryFn: () => attomService.listEnrichments(),
    staleTime: 30_000,
  });
}

export function useSyncAllAttomMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attomService.syncAllPending(),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: [ATTOM_QUERY_KEY] });
      toast.success(
        `Synced ${result.succeeded} of ${result.requested} (failed: ${result.failed})`,
      );
    },
    onError: (err: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Sync all failed",
      );
    },
  });
}

export function useSyncOneAttomMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => attomService.syncOne(propertyId),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: [ATTOM_QUERY_KEY] });
      if (result.status === "SUCCESS") {
        toast.success("Property synced successfully");
      } else {
        toast.error(result.reason || "Property sync failed");
      }
    },
    onError: (err: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Sync failed",
      );
    },
  });
}
