import api from "@/src/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`);
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
      window.location.href  ="/auth/login";
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    loginUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`,
    logout: logoutMutation.mutate,
  };
};

export default useAuth;
