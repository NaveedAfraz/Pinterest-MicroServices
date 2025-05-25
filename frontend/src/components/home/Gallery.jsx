import useFetchPosts from "@/hooks/post/useFetchPosts";
import React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import useBulkFetchMedia from "@/hooks/media/useFetchBulkMedia";

function Gallery() {
  const { data: posts, isLoading, isError, error } = useFetchPosts();
  const mediaIds = posts?.flatMap((post) => post.mediaUrls)?.filter(Boolean);
  const { images, isLoading: mediaLoading } = useBulkFetchMedia(mediaIds);

  console.log('Images array:', images);
  console.log('MediaIds:', mediaIds);

  // Convert images array to a lookup object for easy access
  const imageMap = React.useMemo(() => {
    if (!images || images.length === 0) return {};

    return images.reduce((acc, image) => {
      acc[image.id] = image;
      return acc;
    }, {});
  }, [images]);

  console.log('Image map:', imageMap);

  if (mediaLoading) return <div>Loading media...</div>;
  if (isLoading) return <div>Loading posts...</div>;
  if (isError) {
    toast.error(error.message);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="h-[90vh] p-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 ">
        {posts?.length > 0 && posts.map((post) => (
          <div
            key={post._id}
            className="mb-4 break-inside-avoid relative group overflow-hidden rounded-2xl"
            style={{ maxWidth: "300px" }}
          >

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

            {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 rounded-2xl" /> */}

            <div className="absolute inset-0 flex flex-col justify-between p-3 hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
              <Link to={`/pin/${post._id}`} className="absolute inset-0 z-0 " />
              <button className="self-end bg-red-500 cursor-pointer text-white font-semibold rounded-3xl p-2 px-3 z-10">
                Save
              </button>
              <div className="flex justify-end space-x-2 z-10">
                <button className="bg-white p-2 px-3 cursor-pointer text-black rounded-3xl z-10">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button className="bg-white p-2 px-3 cursor-pointer text-black rounded-3xl z-10">
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