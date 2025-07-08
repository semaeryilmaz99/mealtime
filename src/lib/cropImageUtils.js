// Utility to crop and resize an image using canvas for react-easy-crop
export async function getCroppedImg(imageSrc, croppedAreaPixels, maxSize = 400) {
  const image = await createImage(imageSrc);
  // Calculate resize ratio
  const ratio = Math.min(
    maxSize / croppedAreaPixels.width,
    maxSize / croppedAreaPixels.height,
    1 // Don't upscale
  );
  const outputWidth = Math.round(croppedAreaPixels.width * ratio);
  const outputHeight = Math.round(croppedAreaPixels.height * ratio);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/jpeg', 0.8); // 0.8 = good quality, smaller size
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
} 