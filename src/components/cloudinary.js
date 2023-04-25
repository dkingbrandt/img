import React, { useState } from 'react';
import { Image } from 'cloudinary-react';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_cloudinary_upload_preset');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    setImageUrl(data.secure_url);
  };

  const handleImageCrop = async () => {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload`,
      {
        method: 'POST',
        body: JSON.stringify({
          public_id: 'your_public_id',
          transformation: {
            width: 400,
            height: 400,
            crop: 'fill',
            gravity: 'center',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    setCroppedUrl(data.secure_url);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <h2>Original Image</h2>
          <Image cloudName="your_cloudinary_cloud_name" publicId={imageUrl} />
        </div>
      )}
      {croppedUrl && (
        <div>
          <h2>Cropped Image</h2>
          <Image cloudName="your_cloudinary_cloud_name" publicId={croppedUrl} />
        </div>
      )}
      {imageUrl && (
        <button onClick={handleImageCrop}>Crop Image</button>
      )}
    </div>
  );
};

export default ImageUploader;
