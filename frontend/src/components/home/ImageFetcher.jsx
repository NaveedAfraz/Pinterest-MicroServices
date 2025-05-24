import React, { useEffect, useState } from "react";
import axios from "axios";
 
function ImageFetcher({ mediaId }) {
    const [imageURL, setImageURL] = useState();
    console.log(mediaId);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REQUEST_BASE_URL}/v1/media/image/${mediaId}`, {
                    withCredentials: true,
                });
                console.log(response);
                setImageURL(response.data);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };  

        fetchImage();
    }, [mediaId]);

    return (
        <img
            src={imageURL}
            alt="Post"
            style={{ maxWidth: "300px", margin: "10px" }}
            loading="lazy"
        />
    );
}

export default ImageFetcher;
