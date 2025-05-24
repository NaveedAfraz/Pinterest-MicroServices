import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const useFetchBulkMedia = (mediaIds) => {
  console.log(mediaIds);

  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bulkMedia", mediaIds],
    queryFn: async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REQUEST_BASE_URL}/v1/media/image`,
          { mediaIds }, // body
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },
    enabled: Array.isArray(mediaIds) && mediaIds.length > 0,
  });

  return { images, isLoading, isError, error };
};
export default useFetchBulkMedia;
