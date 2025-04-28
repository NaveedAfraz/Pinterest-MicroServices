import CommentsSection from '@/components/comments'
import FullscreenImageViewer from '@/components/FullPageImage'
import Modal from '@/components/modal'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { ArrowLeft, Heart, Image, Smile, MoreHorizontal, Share } from 'lucide-react'
import React, { useState, useRef } from 'react'

function PostPage() {
  const [openModal, setOpenModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef(null)


  const onEmojiClick = (emojiObject) => {

  }

  return (
    <div className='border-1 w-[80%] lg:w-[60%] xl:w-[50%] h-[80%] mx-auto border-gray-300 rounded-lg bg-white flex flex-col justify-between'>
      <div className="flex h-[100%] p-1 relative">
        <div className='h-full mt-3 w-25'>
          <ArrowLeft />
        </div>
        <Card className="w-full h-full flex relative shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src="https://via.placeholder.com/300"
            alt="Post"
            className="rounded-lg w-full h-full object-cover"
          />
          <button
            className="bg-white absolute right-3 bottom-3 p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setOpen(true)}
          >
            <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </button>
          {open && <FullscreenImageViewer isOpen={open} setOpen={setOpen} />}
        </Card>

        <div className="flex w-full h-full justify-between p-1">
          {/* <div className="flex relative w-full">
            <button className="text-black px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300">
            </button>
            <button className="text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300">
              <Share size={20} />
            </button>
            <button className="text-black py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300">
              <MoreHorizontal size={20} />
            </button>
            <button className="bg-red-500 absolute right-1 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300">
              Save
            </button>
          </div> */}
          <CommentsSection />

          <div className="absolute bottom-1 w-[45%] h-[13%] p-1">
            <p className='text-xs font-semibold mb-3'>What do you think?</p>

            <div className="relative w-full">
              <Input className="w-full h-11 pr-16" placeholder="Add a comment..." />

              <div className="absolute right-2 top-2 flex items-center space-x-2">
             
                <button
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile size={18} />
                </button>

            
                <button
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setOpenModal(true)}
                >
                  <Image size={18} />
                </button>
              </div>
 
              {showEmojiPicker && (
                <div
                  className="absolute right-0 bottom-10 z-10"
                  ref={emojiPickerRef}
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width={250}
                    height={250}
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
      <Modal open={openModal} setOpen={setOpenModal} />
    </div>
  )
}

export default PostPage