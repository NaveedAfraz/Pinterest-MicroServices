import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;
const useFetchPosts = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(
    {
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
    },
    { retry: 0 }
  );
  return { data, isLoading, isError, error };
};

export default useFetchPosts;
