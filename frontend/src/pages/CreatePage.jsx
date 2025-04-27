// App.jsx or your main component file
import React, { useState } from 'react';
import Form from '@/components/Form';

const CreatePage = () => {
  const [showCreatePinForm, setShowCreatePinForm] = useState(false);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="items-center justify-center p-4 md:w-[50vw] w-[70vw] z-50">
        <Form />
        <div className="p-4 flex justify-end border-t">
          <button
            onClick={() => setShowCreatePinForm(false)}
            className="mr-3 px-4 py-2 text-gray-700 font-medium rounded-full hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700">
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;