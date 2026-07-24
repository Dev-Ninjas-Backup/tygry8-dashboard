import { axiosInstance } from "../lib/axios";

export type EnrichmentStatus = "SUCCESS" | "PENDING" | "FAILED";

export interface AttomStats {
  totalProperties: number;
  successfullyEnriched: number;
  pendingSync: number;
}

export interface AttomEnrichmentRow {
  propertyId: string;
  leadNumber: string | null;
  address: string;
  status: EnrichmentStatus;
  avmMatch: number | null;
  lastSyncedAt: string | null;
  reason: string | null;
}

export interface SyncOneResult {
  propertyId: string;
  status: EnrichmentStatus;
  reason: string | null;
}

export interface SyncAllResult {
  requested: number;
  succeeded: number;
  failed: number;
}

async function unwrap<T>(promise: Promise<{ data: unknown }>): Promise<T> {
  const { data } = await promise;
  const body = data as { data?: T } | T;
  if (
    body &&
    typeof body === "object" &&
    "data" in body &&
    body.data !== undefined
  ) {
    return body.data as T;
  }
  return body as T;
}

export const attomService = {
  getStats() {
    return unwrap<AttomStats>(axiosInstance.get("/api/attom/stats"));
  },

  listEnrichments() {
    return unwrap<AttomEnrichmentRow[]>(axiosInstance.get("/api/attom"));
  },

  syncOne(propertyId: string) {
    return unwrap<SyncOneResult>(
      axiosInstance.post(`/api/attom/${propertyId}/sync`),
    );
  },

  syncAllPending() {
    return unwrap<SyncAllResult>(axiosInstance.post("/api/attom/sync-all"));
  },
};
