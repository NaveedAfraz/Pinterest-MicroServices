import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useSearch = (valueFromInput) => {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(valueFromInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [valueFromInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REQUEST_BASE_URL
          }/v1/search/searchPosts?query=${debouncedValue}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);

        return response.data || [];
      } catch (error) {
        console.log(error);
        toast(error?.response?.data?.message);
        return error?.response?.data;
      }
    },
    enabled: !!debouncedValue,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error };
};

export default useSearch;
