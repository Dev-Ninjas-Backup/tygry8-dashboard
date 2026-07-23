import { apiClient } from "./api-client";

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role: string;
  avatarUrl?: string;
  status?: string;
}

export const authService = {
  async login(email: string, password: string) {
    return apiClient.post("/api/auth/login", { email, password });
  },

  async logout() {
    return apiClient.post("/api/auth/logout");
  },

  async getProfile() {
    return apiClient.get<UserProfile>("/api/auth/me");
  },

  async refreshToken() {
    return apiClient.post("/api/auth/refresh");
  },
};
