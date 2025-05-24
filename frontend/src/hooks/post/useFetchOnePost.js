import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_REQUEST_BASE_URL || "";

const useFetchOnePost = (id) => {
  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["OnePost", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${baseURL}/v1/posts/getPostById/${id}`
        );
        return response.data.post;
      } catch (error) {
        console.error("Error fetching post:", error);
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        throw error;
      }
    },
    enabled: !!id,
  });

  return { post, isLoading, isError, error };
};

export default useFetchOnePost;
