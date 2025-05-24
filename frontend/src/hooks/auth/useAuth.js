import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
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
        toast("Logged in successfully");
        return response.data;
      } catch (error) {
        setTimeout(() => {
          toast(error?.response?.data?.message);
        }, 2000);
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
        toast("Registered successfully");
        return response.data;
      } catch (error) {
        setTimeout(() => {
          toast(error?.response?.data?.message);
        }, 2000);
        console.log(error);
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${baseURL}/v1/auth/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        toast("Logged out successfully");
        return response.data;
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          toast(error?.response?.data?.message);
        }, 2000);
      }
    },
  });
  return { login, signUp, logout };
};
export default useAuth;
