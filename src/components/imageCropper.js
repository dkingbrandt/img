import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const imageRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return canvas.toDataURL("image/jpeg");
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={(image) => (imageRef.current = image)}
          onComplete={handleCropComplete}
          onChange={(newCrop) => setCrop(newCrop)}
        />
      )}
      {croppedImageUrl && (
        <img
          style={{ maxWidth: "100%" }}
          alt="Crop"
          src={croppedImageUrl}
        />
      )}
    </div>
  );
};

export default ImageCropper;
