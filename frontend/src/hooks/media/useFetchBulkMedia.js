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
          { mediaIds }, 
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
    retry: 0,
    cacheTime: 1000 * 60 * 10, // 10 mins
    staleTime: 1000 * 60 * 2, // 2 mins
    refetchOnWindowFocus: false,
  });

  return { images, isLoading, isError, error };
};
export default useFetchBulkMedia;
