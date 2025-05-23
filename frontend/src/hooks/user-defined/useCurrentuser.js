// src/hooks/useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrentUser() {
  return useQuery(
    ["currentUser"],
    async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REQUEST_BASE_URL}/v1/auth/me`,
        { withCredentials: true }
      );
      return data.user;
    },
    {
      // only try to fetch after login (or you can always fetch,
      // it will fail with 401 if not logged in)
      retry: false,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    }
  );
}

export default useCurrentUser;
