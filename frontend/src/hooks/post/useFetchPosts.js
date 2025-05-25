import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;
const useFetchPosts = () => {
  const { data : posts , isLoading, isError, error ,refetch} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseURL}/v1/posts/getAllPosts`, {
          withCredentials: true,
        });
        console.log(response);

        return response.data.posts;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    retry: 0,
    cacheTime: 1000 * 60 * 10, // 10 minutes
    // 🟡 Consider data fresh for 2 minutes (won't refetch)
    staleTime: 1000 * 60 * 2, // 2 minutes
    // 🌀 Optional: refetch when window refocuses
    refetchOnWindowFocus: false,
  });
  return { posts , isLoading, isError, error ,refetch };
};

export default useFetchPosts;
