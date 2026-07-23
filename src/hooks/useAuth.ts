import { useAuthStore } from "../store/useAuthStore";
import { useLoginMutation, useLogoutMutation, useProfileQuery } from "./useAuthMutations";

export const useAuth = () => {
  const { user, isAuthenticated } = useAuthStore();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  useProfileQuery();

  return {
    user,
    isAuthenticated,
    login: async (email: string, password: string) => {
      try {
        await loginMutation.mutateAsync({ email, password });
        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          message:
            err?.response?.data?.message || err?.message || "Invalid email or password",
        };
      }
    },
    logout: async () => {
      await logoutMutation.mutateAsync();
    },
    isLoading: loginMutation.isPending || logoutMutation.isPending,
  };
};
