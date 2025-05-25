import React, { useState, useRef } from "react";
import { Loader, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUpload from "@/hooks/media/useUpload";
import useUploadPost from "@/hooks/post/useUploadPost";
import useDeleteMedia from "@/hooks/media/useDeleteMedia";
import { useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
  export default function CreatePinForm() {
  const [showMore, setShowMore] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileList, setFileList] = useState(null);
  const [ShowCreatePinForm, setShowCreatePinForm] = useState(false)
  const fileInputRef = useRef(null);
  const [content, setContent] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const { UploadPhoto, uploaded, uploading } = useUpload(fileList) // assuming useUpload is a hook that returns an object with an upload function
  const { UploadPost } = useUploadPost(content, UploadPhoto)
  const [photoUploded, setPhotoUploded] = useState(false)
  const { deleteMedia } = useDeleteMedia(photoUploded?._id)
  const queryClient = useQueryClient();

  console.log(UploadPhoto)
  const handleDragOver = (e) => {
    e.preventDefault();
    // console.log("mutating")
    setDragging(true);
  };
  useEffect(() => {
    if (UploadPhoto?.data?.media) {
      setPhotoUploded(UploadPhoto?.data?.media)
    }
  }, [UploadPhoto])
  console.log(photoUploded);

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e) => {
    console.log("handleDrop triggered");
    e.preventDefault();
    console.log(e);

    setDragging(false);
    if (e.dataTransfer.files.length) {
      const droppedFiles = [...e.dataTransfer.files];
      setFileList(droppedFiles);
      setTimeout(() => {
        console.log("mutating")
        UploadPhoto.mutate();
      }, 0);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const selectedFiles = [...e.target.files];
      setFileList(selectedFiles);
      setTimeout(() => {
        console.log("mutating")
        UploadPhoto.mutate();
      }, 0);
    }
  };

  //const photoUploded = !UploadPhoto.data.success
  // const boards = ["Board 1", "Board 2", "Board 3"];  
  const handleCreatePost = async () => {
    if (!UploadPhoto?.data?.media || !content.title || !content.description || !content.tags) {
      return
    }
    await UploadPost.mutateAsync()
    setContent({
      title: "",
      description: "",
      tags: [],
    })
    toast("Post created successfully")
    setFileList(null)
    queryClient.invalidateQueries({ queryKey: ["posts"] })
    UploadPhoto.reset()
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-medium">Create Pin</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {!UploadPhoto?.data?.media && !uploading ? (
            <div
              className={
                `border-2 border-dashed rounded-lg p-6 bg-amber-800 z-500 h-96 flex flex-col items-center justify-center cursor-pointer transition-colors ` +
                (dragging
                  ? "border-blue-500 bg-blue-200"
                  : "border-gray-300 bg-gray-100")
              }
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="w-8 h-8 text-gray-600 mb-4" />
              <p className="font-medium">Choose a file or drag and drop</p>
              <p className="text-sm text-gray-500 mb-4">
                We recommend high quality .jpg or .mp4 files
              </p>
              <input
                type="file"
                accept="image/*,video/mp4"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button variant="outline">Browse</Button>
            </div>) : (
            <>
              {uploading && (
                <div className="h-96 w-full flex justify-center items-center">
                  <Loader />
                </div>
              )}
              {!uploading && uploaded && (
                <div className="h-full w-full flex justify-center items-center object-contain">
                  <img src={UploadPhoto?.data?.media?.url} className="h-full w-full object-contain rounded-lg" alt="can't load image" />
                </div>
              )}
            </>
          )}

        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-1.5 ">Title</Label>
            <Input id="title" placeholder="Add a title" disabled={!UploadPhoto?.data?.media} value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
          </div>

          <div>
            <Label htmlFor="description" className="mb-1.5">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a detailed description"
              disabled={!UploadPhoto?.data?.media}
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
            />
          </div>

          {/* <div>
            <Label htmlFor="link" className="mb-1.5">Link</Label>
            <Input id="link" type="url" placeholder="Add a link" photoUploded={photoUploded} />
          </div> */}

          {/* <div>
            <Label htmlFor="board" className="mb-1.5">Board</Label>
            <Select photoUploded={photoUploded}>
              <SelectTrigger id="board" className="w-full">
                <SelectValue placeholder="Choose a board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          <div>
            <Label htmlFor="tags" className="mb-1.5">Tagged topics (0)</Label>
            <Input id="tags" placeholder="Search for a tag" disabled={!UploadPhoto?.data?.media} value={content.tags} onChange={(e) => setContent({ ...content, tags: e.target.value })} />
            <p className="text-xs text-gray-400 mt-1">
              Don't worry, people won't see your tags.
            </p>
          </div>
          <div className="p-4 flex justify-end border-t">
            <button
              onClick={() => {
                if (UploadPhoto?.data?.media || content.title.length > 0 || content.description.length > 0 || content.tags.length > 0) {
                  setShowCreatePinForm(false)
                  setContent({
                    title: "",
                    description: "",
                    tags: [],
                  })
                  setFileList(null)
                  deleteMedia.mutate()
                  UploadPhoto.reset()
                  toast("Post cancelled")
                }
              }}
              className="mr-3 px-4 py-2 text-gray-700 cursor-pointer font-medium rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button className="px-4 py-2 cursor-pointer bg-red-600 text-white font-medium rounded-full hover:bg-red-700"
              onClick={handleCreatePost}
            >
              Save
            </button>

          </div>

        </div>
      </div>
    </div >
  );
}
