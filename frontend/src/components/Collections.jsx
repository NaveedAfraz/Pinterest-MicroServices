import React from 'react';

function Collections() {
    // Collection data based on the image
    const collections = [
        {
            id: 1,
            title: 'All Pins',
            pinCount: 549,
            timeframe: '3d',
            coverImages: [
                '/images/chaos-mental-book.jpg',
                '/images/minimal-shelves.jpg',
            ]
        },
        {
            id: 2,
            title: 'Black',
            pinCount: 28,
            timeframe: '1y',
            coverImages: [
                '/images/black-rose.jpg',
                '/images/black-butterfly.jpg',
                '/images/black-geometric.jpg',
            ]
        },
        {
            id: 3,
            title: 'F1 Wallpapers',
            pinCount: 21,
            timeframe: '7mo',
            coverImages: [
                '/images/f1-car-blur.jpg',
                '/images/track-aerial.jpg',
                '/images/racing-closeup.jpg',
            ]
        },
        {
            id: 4,
            title: 'Inspo de piso ✨',
            pinCount: 132,
            timeframe: '2mo',
            coverImages: [
                '/images/light-interior.jpg',
                '/images/bookshelf-styling.jpg',
            ]
        },
        {
            id: 5,
            title: 'My moods',
            pinCount: 26,
            timeframe: '3y',
            coverImages: [
                '/images/blue-clouds.jpg',
                '/images/white-flower.jpg',
                '/images/instagram-post.jpg',
            ]
        },
        {
            id: 6,
            title: 'Reading',
            pinCount: 219,
            timeframe: '1mo',
            sections: 2,
            coverImages: [
                '/images/piel-de-letra.jpg',
                '/images/orange-book.jpg',
            ]
        },
        {
            id: 7,
            title: 'words',
            pinCount: 27,
            timeframe: '7mo',
            coverImages: [
                '/images/metanoia-quote.jpg',
                '/images/text-aesthetic.jpg',
            ]
        },
        {
            id: 8,
            title: 'selenophile',
            pinCount: 40,
            timeframe: '1y',
            coverImages: [
                '/images/moon-phases.jpg',
                '/images/full-moon.jpg',
                '/images/moon-glow.jpg',
            ]
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-5 font-sans">
            <h1 className="text-2xl font-bold mb-6">Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {collections.map((collection) => (
                    <div key={collection.id} className="rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                        <div className="relative h-48 grid grid-cols-3 grid-rows-2 gap-0.5 rounded-2xl overflow-hidden">
                            {collection.coverImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            ))}
                        </div>
                        <div className="py-3 px-1">
                            <h3 className="text-base font-semibold">{collection.title}</h3>
                            <div className="text-xs text-gray-500 mt-1">
                                <span>{collection.pinCount} Pins</span>
                                {collection.sections && <span> • {collection.sections} sections</span>}
                                <span> • {collection.timeframe}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Collections;