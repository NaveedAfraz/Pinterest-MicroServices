import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;
const useDeletePost = (id) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(
          `${baseURL}/v1/posts/deletePost/${id}`,
          {
            withCredentials: true,
          }
        );
        toast(response.data.message);
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        toast(error.response.data.message);
      }
    },
  });
  return { mutate };
};
export default useDeletePost;
