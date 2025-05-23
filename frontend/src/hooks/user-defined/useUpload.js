import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const useUpload = (fileList) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  console.log(fileList);
  const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;

  const UploadPhoto = useMutation({
    mutationFn: async () => {
      setUploading(true);
      try {
        const formData = new FormData();
        if (fileList && fileList.length > 0) {
          formData.append("file", fileList[0]);
        } else {
          throw "No file selected.";
        }
        const response = await axios.post(
          `${baseURL}/v1/media/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        setUploaded(true);
        setUploading(false);
        toast(`File uploaded successfully`);
        return response.data;
      } catch (error) {
        console.log(error);
        toast(`Error uploading file: ${error?.response?.data?.message}`);
        setUploading(false);
      }
    },
  });

  return { UploadPhoto, uploading, uploaded };
};

export default useUpload;
