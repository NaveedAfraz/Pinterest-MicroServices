import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;
const useAuth = () => {
  const login = useMutation({
    mutationFn: async (FormData) => {
      try {
        const response = await axios.post(
          `${baseURL}/v1/auth/login`,
          {
            email: FormData.email,
            password: FormData.password,
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
  });

  const signUp = useMutation({
    mutationFn: async (FormData) => {
      try {
        const response = await axios.post(
          `${baseURL}/v1/auth/register`,
          {
            username: FormData.username,
            email: FormData.email,
            password: FormData.password,
          },
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { login, signUp };
};
export default useAuth;
