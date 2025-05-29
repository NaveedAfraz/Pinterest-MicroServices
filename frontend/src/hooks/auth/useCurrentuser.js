import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function useCurrentUser() {
  const {
    data: currentUser,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REQUEST_BASE_URL}/v1/auth/me`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });

  return { currentUser, error, isError, isLoading, refetch };
}

export default useCurrentUser;
