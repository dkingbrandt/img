import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import '../uploadImg.css';
import { handleCropBoxMouseDown } from './cropImg';



const UploadImg = () => {
  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [result, setResult] = useState(null);

  const [image, setImage] = useState(null);
  const [draggingCropBox, setDraggingCropBox] = useState(false);
  const cropBoxRef = useRef(null);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          setImagePreview(canvas.toDataURL());
          setImage(canvas);
        };
      };
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const previewWidth = ref.style.width.slice(0, -2);
    const previewHeight = ref.style.height.slice(0, -2);
    const x = ref.getBoundingClientRect().x - e.currentTarget.offsetLeft;
    const y = ref.getBoundingClientRect().y - e.currentTarget.offsetTop;

    const scaleX = image.width / previewWidth;
    const scaleY = image.height / previewHeight;

    const previewX = x * scaleX;
    const previewY = y * scaleY;

    if (cropBoxRef.current) {
      const width = cropBoxRef.current.offsetWidth * scaleX;
      const height = cropBoxRef.current.offsetHeight * scaleY;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = cropBoxRef.current.offsetWidth;
      canvas.height = cropBoxRef.current.offsetHeight;
      ctx.drawImage(imageRef.current, previewX, previewY, width, height, 0, 0, cropBoxRef.current.offsetWidth, cropBoxRef.current.offsetHeight);
      setImagePreview(canvas.toDataURL());
    }
  };



  const handleDragStart = () => {
    setDraggingCropBox(true);
  };

  const handleDragStop = (e, d) => {
    const newCropData = { ...cropData };
    if (cropBoxRef.current) {
      newCropData.x -= d.x / (image.width / cropBoxRef.current.offsetWidth);
      newCropData.y -= d.y / (image.height / cropBoxRef.current.offsetHeight);
    }
    setCropData(newCropData);
    setDraggingCropBox(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = cropData.width;
    canvas.height = cropData.height;
    ctx.drawImage(image, cropData.x, cropData.y, cropData.width, cropData.height, 0, 0, cropData.width, cropData.height);

    const dataURL = canvas.toDataURL();
    setResult(dataURL);
  };

 

  return (
    <form onSubmit={handleSubmit} className="upload-img-form">

      <label htmlFor="image-upload">Upload Image:</label>
      <input type="file" id="image-upload" name="image-upload" accept="image/*" onChange={handleFileInputChange} />

      {imagePreview && (
        <div className="preview-container">
          <Rnd
            className="preview"
            default={{
              width: 300,
              height: 300,
              x: (500 - 300) / 2,
              y: (400 - 300) / 2,
            }}
            onResizeStop={handleResizeStop}
            
            dragHandleClassName="drag-handle"
            style={{ zIndex: 1 }} // add zIndex property
          >
            <img src={imagePreview} alt="Preview" />
          </Rnd>

          <div className="crop-box" style={{ left: cropData.x, top: cropData.y, width: cropData.width, height: cropData.height }} onMouseDown={handleCropBoxMouseDown}></div>

        </div>
      )}

      <button type="submit">Submit</button>

      {result && (
        <div className="result-container">
          <img src={result.data} alt="Result" />
        </div>
      )}
     
      {console.log(result)}
    </form>

    
  );


};

export default UploadImg;