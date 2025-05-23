import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;

const useDeleteMedia = (mediaId) => {
  const deleteMedia = useMutation({
    mutationFn: async () => {
      try {
        console.log(mediaId);

        const response = await axios.delete(`${baseURL}/v1/media/delete/${mediaId}`, {
          withCredentials: true,
        });
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { deleteMedia };
};

export default useDeleteMedia;
