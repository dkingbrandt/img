
export const handleCropBoxMouseDown = (e) => {
  e.preventDefault();
  const cropBox = e.target;
  const startX = e.clientX;
  const startY = e.clientY;
  const startWidth = parseInt(window.getComputedStyle(cropBox).width);
  const startHeight = parseInt(window.getComputedStyle(cropBox).height);

  const handleMouseMove = (e) => {
    e.preventDefault();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    cropBox.style.width = `${startWidth + deltaX}px`;
    cropBox.style.height = `${startHeight + deltaY}px`;
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};