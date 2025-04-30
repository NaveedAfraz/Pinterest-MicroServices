import React from "react";
import { Link } from "react-router";
function Gallery() {
  const items = [
    {
      id: 1,
      media:
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      width: 1260,
      height: 1000,
      title: "Mountain Landscape",
      description: "Beautiful mountain view at sunset",
    },
    {
      id: 2,
      media:
        "https://images.pexels.com/photos/3601453/pexels-photo-3601453.jpeg",
      width: 1260,
      height: 1400,
      title: "Beach Paradise",
      description: "Tropical beach with palm trees",
    },
    {
      id: 3,
      media:
        "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg",
      width: 1260,
      height: 1400,
      title: "City Architecture",
      description: "Modern cityscape with skyscrapers",
    },
    {
      id: 4,
      media:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      width: 1260,
      height: 1000,
      title: "Gourmet Dish",
      description: "Delicious food presentation",
    },
    {
      id: 5,
      media:
        "https://images.pexels.com/photos/1181181/pexels-photo-1181181.jpeg",
      width: 1260,
      height: 1200,
      title: "Workspace Setup",
      description: "Modern minimalist home office",
    },
    {
      id: 6,
      media:
        "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg",
      width: 1260,
      height: 1400,
      title: "Autumn Forest",
      description: "Colorful fall leaves in the woods",
    },
    {
      id: 7,
      media:
        "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg",
      width: 1260,
      height: 1000,
      title: "Cozy Reading Corner",
      description: "Perfect spot for reading with a cup of tea",
    },
    {
      id: 8,
      media:
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      width: 1260,
      height: 1200,
      title: "Plant Collection",
      description: "Indoor plants for home decoration",
    },
    {
      id: 9,
      media:
        "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg",
      width: 1260,
      height: 1400,
      title: "Vintage Car",
      description: "Classic automobile on open road",
    },
    {
      id: 10,
      media:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      width: 1260,
      height: 1000,
      title: "Stylish Fashion",
      description: "Trendy outfit inspiration",
    },
    {
      id: 11,
      media:
        "https://images.pexels.com/photos/2449600/pexels-photo-2449600.jpeg",
      width: 1260,
      height: 1300,
      title: "Waterfall Adventure",
      description: "Hidden waterfall in tropical forest",
    },
    {
      id: 12,
      media:
        "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg",
      width: 1260,
      height: 1100,
      title: "Art Gallery",
      description: "Modern art exhibition space",
    },
  ];
  return (
    <div className="h-[90vh]  p-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {items.map((photo) => (
          <div
            key={photo.id}
            className="mb-4 break-inside-avoid relative group"
          >
            <Link to={`/pin/${photo.id}`} className="absolute inset-0 z-33" />
            <img
              src={photo.media}
              alt={photo.title}
              className="rounded-2xl w-full"
            />
            <div
              className="
                absolute inset-0
                bg-gray-900/50
                rounded-2xl
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            />
            <div
              className="
                absolute inset-0
                flex flex-col justify-between
                p-3
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <button className="self-end bg-red-500 z-40 cursor-pointer text-white font-semibold rounded-3xl p-2 px-3">
                Save
              </button>
              <div className="flex justify-end space-x-2">
                <button className="bg-white p-2 px-3 z-40 cursor-pointer text-black rounded-3xl">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button className="bg-white p-2 px-3 z-40 cursor-pointer text-black rounded-3xl">
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
