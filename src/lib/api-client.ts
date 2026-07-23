export interface ApiResponse<T = any> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, any>;
}

class ApiClient {
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers as Record<string, string>),
      },
    };

    // Ensure route maps to backend proxy or relative api
    const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    try {
      let response = await fetch(url, config);

      // Handle 401 Unauthorized - Silent token refresh retry
      if (response.status === 401 && !endpoint.includes("/api/auth/")) {
        const refreshResponse = await fetch("/api/auth/refresh", {
          method: "POST",
        });

        if (refreshResponse.ok) {
          // Retry original request after token refresh
          response = await fetch(url, config);
        } else {
          // Refresh failed - redirect to login if client-side
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
          }
        }
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Network error occurred",
      };
    }
  }

  get<T = any>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T = any>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T = any>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T = any>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
