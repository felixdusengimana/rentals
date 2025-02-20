import api from "@/src/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../types/user";

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, refetch, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await api.get<IUser>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`);
      return res.data;
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      }); 

      localStorage.removeItem("authToken");
      window.location.href  ="/";
    },
  });

  return {
    user,
    refetchUser: refetch,
    isLoading,
    isAuthenticated: !!user,
    isHost: user?.role === "HOST",
    isRenter: user?.role === "RENTER" || user?.role===null,
    isAdmin: user?.role === "ADMIN",
    error,
    loginUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`,
    logout: logoutMutation.mutate,
  };
};

export default useAuth;
