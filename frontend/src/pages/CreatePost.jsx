// App.jsx or your main component file
import React, { useState } from 'react';
import Form from '@/components/Form';

const CreatePost = () => {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="items-center justify-center p-4 md:w-[50vw] w-[70vw] z-0">
        <Form />
      </div>
    </div>
  );
};

export default CreatePost;