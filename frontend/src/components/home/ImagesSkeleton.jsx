import React from 'react';

function ImagesSkeleton() {
  // Generate random heights for realistic Pinterest layout
  const generateHeight = () => Math.floor(Math.random() * 200) + 150;
  
  const skeletons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: generateHeight()
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-7 gap-4">
          {skeletons.map((skeleton) => (
            <div 
              key={skeleton.id} 
              className="mb-4 break-inside-avoid"
            >
              <div
                className="w-full bg-gray-300 rounded-3xl animate-pulse"
                style={{ height: `${skeleton.height}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagesSkeleton;