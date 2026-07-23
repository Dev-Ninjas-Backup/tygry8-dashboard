import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile | null, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

// Helper to update cookie for Next.js Proxy / Middleware access
const updateAuthCookies = (accessToken: string | null, refreshToken: string | null) => {
  if (typeof document === "undefined") return;

  if (accessToken) {
    document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
  } else {
    document.cookie = `accessToken=; path=/; max-age=0`;
  }

  if (refreshToken) {
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    document.cookie = `refreshToken=; path=/; max-age=0`;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => {
        updateAuthCookies(accessToken, refreshToken);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken,
        });
      },

      setTokens: (accessToken, refreshToken) => {
        updateAuthCookies(accessToken, refreshToken);
        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken,
        }));
      },

      setUser: (user) => {
        set((state) => ({
          ...state,
          user,
        }));
      },

      logout: () => {
        updateAuthCookies(null, null);
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
