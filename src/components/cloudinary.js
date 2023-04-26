import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onImageUpload = (pictureFiles) => {
    const file = pictureFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropClick = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div>
      <ImageUploader
        withIcon={true}
        buttonText="Choose image"
        onChange={onImageUpload}
        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
        maxFileSize={5242880}
      />
      {image && (
        <>
          <div style={{ width: '100%', height: '400px', position: 'relative' }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={onCropClick}>Crop Image</button>
          </div>
        </>
      )}
      {croppedImage && (
        <div style={{ width: '100%', height: '400px', position: 'relative' }}>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
