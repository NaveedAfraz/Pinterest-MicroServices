import CommentsSection from '@/components/comments'
import FullscreenImageViewer from '@/components/FullPageImage'
import Modal from '@/components/modal'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { ArrowLeft, Heart, Image, Smile, MoreHorizontal, Share, Send, Trash } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router'
import useFetchOnePost from '@/hooks/post/useFetchOnePost'
import useBulkFetchMedia from '@/hooks/media/useFetchBulkMedia'
import { Link } from 'react-router'
import useCurrentUser from '@/hooks/auth/useCurrentuser'
import useDeletePost from '@/hooks/post/useDeletePost'

function PostPage() {
  const [openModal, setOpenModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const emojiPickerRef = useRef(null)
  const [comments, setComments] = useState([])
  const [value, setValue] = useState("")
  const { currentUser } = useCurrentUser()
  console.log(currentUser);

  const onEmojiClick = (emojiObject) => {
    setValue(value + emojiObject.emoji)
  }

  const { post, isLoading, isError, error } = useFetchOnePost(id)
  const { images, isLoading: mediaLoading } = useBulkFetchMedia(post?.mediaUrls || "")
  console.log(images);
  const { mutate } = useDeletePost(id)
  const handleSend = () => {
    setComments([...comments, { text: value }])
    setValue("")
  }

  return (
    <div className='w-full min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6'>

      <div className='block lg:hidden'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>

          <div className='flex items-center justify-between p-4 border-b'>
            <Link to="/gallery" className='p-2 hover:bg-gray-100 rounded-full'>
              <ArrowLeft size={20} />
            </Link>
            <div className='flex items-center space-x-3'>
              <button className='p-2 hover:bg-gray-100 rounded-full'>
                <Share size={20} />
              </button>
              <button className='p-2 hover:bg-gray-100 rounded-full'>
                <MoreHorizontal size={20} />
              </button>
              <button className='p-2 hover:bg-gray-100 rounded-full text-red-500' onClick={() => mutate()}>
                <Trash size={20} />
              </button>
            </div>
          </div>

          <div className='relative'>
            <img
              src={images?.[0]?.url}
              alt="Post"
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <button
              className="absolute right-3 bottom-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => setOpen(true)}
            >
              <i className='fa-solid fa-arrow-up-right-from-square'></i>
            </button>
          </div>


          <div className='p-4'>
            <CommentsSection comments={comments} />
          </div>

          <div className="p-4 border-t bg-white sticky bottom-0">
            <p className='text-sm font-semibold mb-3'>What do you think?</p>
            <div className="relative w-full">
              <Input
                className="w-full h-12 pr-20"
                placeholder="Add a comment..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="absolute right-2 top-2 flex items-center space-x-2">
                <button
                  className="p-1.5 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile size={18} />
                </button>
                <button
                  onClick={handleSend}
                  className="bg-red-500 text-white px-2.5 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  <Send size={14} />
                </button>
              </div>

              {showEmojiPicker && (
                <div
                  className="absolute right-0 bottom-14 z-20"
                  ref={emojiPickerRef}
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width={280}
                    height={300}
                    lazyLoadEmojis={true}
                    skinTonesDisabled
                    searchDisabled
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className='hidden lg:block'>
        <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden'>
          <div className="flex h-[85vh]">

            <div className='flex-1 relative bg-black flex items-center justify-center'>
              <Link to="/gallery" className='absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg'>
                <ArrowLeft size={20} />
              </Link>

              <button className='absolute top-4 right-4 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md hover:shadow-lg  text-red-500' onClick={() => mutate()}>
                <Trash size={20} />
              </button>

              <img
                src={images?.[0]?.url}
                alt="Post"
                className="max-w-full max-h-full object-contain rounded-l-2xl"
                loading="lazy"
              />

              <button
                className="absolute right-4 bottom-4 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => setOpen(true)}
              >
                <i className='fa-solid fa-arrow-up-right-from-square text-lg'></i>
              </button>
            </div>

            {/* Right Side - Comments & Actions */}
            <div className='w-96 xl:w-[400px] flex flex-col bg-white'>
              {/* Header Actions */}
              <div className='p-4 border-b flex justify-between items-center'>
                <div className='flex items-center space-x-3'>
                  <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                    <Heart size={20} />
                  </button>
                  <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                    <Share size={20} />
                  </button>
                  <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                {/* <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 font-semibold">
                  Save
                </button> */}
              </div>

              {/* Comments Section */}
              <div className='flex-1 overflow-y-auto p-4'>
                <CommentsSection comments={comments} />
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t bg-gray-50">
                <p className='text-sm font-semibold mb-3 text-gray-700'>What do you think?</p>
                <div className="relative w-full">
                  <Input
                    className="w-full h-12 pr-20 bg-white border-gray-300 focus:border-red-500"
                    placeholder="Add a comment..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <div className="absolute right-2 top-2 flex items-center space-x-2">
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile size={18} />
                    </button>
                    <button
                      onClick={handleSend}
                      className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      <Send size={14} />
                    </button>
                  </div>

                  {showEmojiPicker && (
                    <div
                      className="absolute right-0 bottom-14 z-20"
                      ref={emojiPickerRef}
                    >
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={320}
                        height={350}
                        lazyLoadEmojis={true}
                        skinTonesDisabled
                        searchDisabled
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='hidden md:block lg:hidden'>
        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden'>
          <div className="flex flex-col">

            <div className='flex items-center justify-between p-4 border-b'>
              <Link to="/gallery" className='p-2 hover:bg-gray-100 rounded-full'>
                <ArrowLeft size={22} />
              </Link>
              <div className='flex items-center space-x-4'>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <Heart size={22} />
                </button>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <Share size={22} />
                </button>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <MoreHorizontal size={22} />
                </button>
                <button className='p-2 hover:bg-gray-100 rounded-full text-red-500' onClick={() => mutate()}>
                  <Trash size={22} />
                </button>
                {/* <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 font-semibold">
                  Save
                </button> */}
              </div>
            </div>

            <div className='relative bg-black flex justify-center'>
              <img
                src={images?.[0]?.url}
                alt="Post"
                className="max-h-[60vh] object-contain"
                loading="lazy"
              />
              <button
                className="absolute right-4 bottom-4 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => setOpen(true)}
              >
                <i className='fa-solid fa-arrow-up-right-from-square text-lg'></i>
              </button>
            </div>

            <div className='p-6'>
              <CommentsSection comments={comments} />
            </div>


            <div className="p-6 border-t bg-gray-50">
              <p className='text-sm font-semibold mb-4 text-gray-700'>What do you think?</p>
              <div className="relative w-full">
                <Input
                  className="w-full h-12 pr-20 bg-white"
                  placeholder="Add a comment..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="absolute right-3 top-2 flex items-center space-x-3">
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile size={20} />
                  </button>
                  <button
                    onClick={handleSend}
                    className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                  >
                    <Send size={16} />
                  </button>
                </div>

                {showEmojiPicker && (
                  <div
                    className="absolute right-0 bottom-14 z-20"
                    ref={emojiPickerRef}
                  >
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width={300}
                      height={320}
                      lazyLoadEmojis={true}
                      skinTonesDisabled
                      searchDisabled
                      previewConfig={{ showPreview: false }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {open && <FullscreenImageViewer isOpen={open} setOpen={setOpen} imageUrl={images?.[0]?.url} />}
    </div>
  )
}

export default PostPage