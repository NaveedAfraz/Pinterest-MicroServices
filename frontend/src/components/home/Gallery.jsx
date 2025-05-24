import useFetchPosts from "@/hooks/user-defined/useFetchPosts";
import React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import ImageFetcher from "./ImageFetcher";
function Gallery() {
  const { data: posts, isLoading, isError, error } = useFetchPosts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return toast(error.message);


  console.log(posts);
  return (
    <div className="h-[90vh]  p-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="mb-4 break-inside-avoid relative group"
          >
            <Link to={`/pin/${post.id}`} className="absolute inset-0 z-33" />
            {post.mediaUrls.map((mediaId) => (
              <ImageFetcher key={mediaId} mediaId={mediaId} />
            ))}
            <div
              className="
                absolute inset-0
                bg-gray-900/50
                rounded-2xl
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            />
            <div
              className="
                absolute inset-0
                flex flex-col justify-between
                p-3
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <button className="self-end bg-red-500 z-40 cursor-pointer text-white font-semibold rounded-3xl p-2 px-3">
                Save
              </button>
              <div className="flex justify-end space-x-2">
                <button className="bg-white p-2 px-3 z-40 cursor-pointer text-black rounded-3xl">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button className="bg-white p-2 px-3 z-40 cursor-pointer text-black rounded-3xl">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
