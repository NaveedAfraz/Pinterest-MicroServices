import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const useUploadPost = (content, UploadPhoto) => {
  const queryClient = useQueryClient();
  const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;
  const UploadPost = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${baseURL}/v1/posts/createPost`,
          {
            title: content.title,
            description: content.description,
            mediaUrls: [UploadPhoto?.data?.media?._id],
            tags: [content.tags],
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["pins"] });
    // },
  });
  return { UploadPost };
};
export default useUploadPost;
