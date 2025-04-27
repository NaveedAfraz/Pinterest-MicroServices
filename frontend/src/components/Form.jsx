import React, { useState, useRef } from "react";
import { Upload, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreatePinForm() {
  const [showMore, setShowMore] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileList, setFileList] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) {
      setFileList([...e.dataTransfer.files]);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFileList([...e.target.files]);
    }
  };

  const disabled = !fileList?.length;
  const boards = ["Board 1", "Board 2", "Board 3"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-medium">Create Pin</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div
            className={
              `border-2 border-dashed rounded-lg p-6 h-96 flex flex-col items-center justify-center cursor-pointer transition-colors ` +
              (dragging
                ? "border-blue-500 bg-blue-50"
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
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-1.5">Title</Label>
            <Input id="title" placeholder="Add a title" disabled={disabled} />
          </div>

          <div>
            <Label htmlFor="description" className="mb-1.5">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a detailed description"
              disabled={disabled}
            />
          </div>

          <div>
            <Label htmlFor="link" className="mb-1.5">Link</Label>
            <Input id="link" type="url" placeholder="Add a link" disabled={disabled} />
          </div>

          <div>
            <Label htmlFor="board" className="mb-1.5">Board</Label>
            <Select disabled={disabled}>
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
          </div>

          <div>
            <Label htmlFor="tags" className="mb-1.5">Tagged topics (0)</Label>
            <Input id="tags" placeholder="Search for a tag" disabled={disabled} />
            <p className="text-xs text-gray-400 mt-1">
              Don't worry, people won't see your tags.
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}
