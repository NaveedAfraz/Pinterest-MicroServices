import React from 'react'
import { Skeleton } from '../ui/skeleton'

function ImagesSkeleton() {
    const images = Array.from({ length: 12 }, (_, index) => index);
    return (
        <>
            {images.map((image) => (
                <Skeleton key={image} width={300} height={300} className="rounded-2xl" />
            ))}
        </>
    )
}

export default ImagesSkeleton