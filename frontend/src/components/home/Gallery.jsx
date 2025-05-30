import useFetchPosts from "@/hooks/post/useFetchPosts";
import React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import useBulkFetchMedia from "@/hooks/media/useFetchBulkMedia";
import { useEffect } from "react";
import ImagesSkeleton from "./ImagesSkeleton";

function Gallery() {
  const { posts, isLoading, isError, error, refetch } = useFetchPosts();

  const mediaIds = React.useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    return posts.flatMap((post) => post.mediaUrls || []).filter(Boolean);
  }, [posts]);

  const { images, isLoading: mediaLoading } = useBulkFetchMedia(mediaIds);

  useEffect(() => {
    if (!posts || posts.length == 0) {
      refetch()
    }
  }, [posts])

  const imageMap = React.useMemo(() => {
    if (!images || images.length === 0) return {};

    return images.reduce((acc, image) => {
      acc[image.id] = image;
      return acc;
    }, {});
  }, [images]);


  if (isLoading || (mediaLoading && mediaIds.length > 0)) {
    return <ImagesSkeleton />;
  }

  if (isError) {
    toast.error(error.message);
    return <div>Error loading posts</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="h-[90vh] p-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {posts.length > 0 && posts.map((post) => (
          <div
            key={post._id}
            className="mb-4 break-inside-avoid relative group rounded-2xl"
            style={{ maxWidth: "300px" }}
          >
            <Link to={`/pin/${post._id}`} className="absolute inset-0 z-11" />

            {post?.mediaUrls?.length > 0 &&
              post.mediaUrls.map((mediaId, index) => {
                const imageData = imageMap[mediaId];
                if (!imageData) return null;

                return (
                  <img
                    key={`${mediaId}-${index}`}
                    src={imageData.url}
                    alt={`Post ${post._id} image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-200"
                  />
                );
              })}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5 rounded-2xl" />

            <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button className="self-end bg-red-500 cursor-pointer text-white font-semibold rounded-3xl p-2 px-3">
                Save
              </button>

              <div className="flex justify-end space-x-2">
                <button className="bg-white p-2 px-3 cursor-pointer text-black rounded-3xl">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button className="bg-white p-2 px-3 cursor-pointer text-black rounded-3xl">
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