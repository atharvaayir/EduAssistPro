import React, { useEffect, useState } from 'react'
const ImageDisplay = ({ imageId }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageId) {
      setLoading(false);
      return; // Or set a default image/state
    }

    setLoading(true);
    setError(null);

    // Construct the URL to your backend endpoint.  Replace with your actual API endpoint.
    const backendUrl = `http://localhost:8000/api/image/${imageId}`; //  Important: Replace this!!!

    fetch(backendUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.blob(); // Get the response as a Blob
      })
      .then(blob => {
        // Create an object URL from the Blob.  This URL can be used in an <img> tag.
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

  }, [imageId]); 


  return (
    <>
        { 
            loading ? <div>Loading image...</div> :
            (
                error ? <div>Error: {error.message}</div> :
                (
                    !imageUrl ? <div>No image to display.</div> :
                        <img src={imageUrl} alt="Image from server" style={{ maxWidth: '100%', height: 'auto' }} />
                )
            )
        }
    </>
  );
};

export default ImageDisplay;