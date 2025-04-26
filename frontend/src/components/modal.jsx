import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Upload } from 'lucide-react'

function Modal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a photo</DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex flex-col justify-center items-center'>
          <div className="flex flex-col justify-center h-75 bg-gray-300 rounded-2xl w-full items-center">
            <input type="file" accept="image/*" className="mb-4 w-full h-full  bg-amber-600 hidden" />
            <Upload className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500" />
            <p className='mt-5'>Choose an image</p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Modal