import fs from 'fs/promises';
import sharp from 'sharp';

//defining an interface to hold the types values
interface ResizeImageProps {
  width: number;
  height: number;
  filePathOriginalImage: string;
  filePathThumbnailImage: string;
}

// resize an image and saves it to the thumbnail path and returns the buffer of resized image
const resizeImage = async ({
  width,
  height,
  filePathOriginalImage,
  filePathThumbnailImage,
}: ResizeImageProps): Promise<Buffer> => {
  const data: Buffer | null = await fs
    .readFile(filePathOriginalImage)
    .catch(() => null);

  if (!data) {
    console.log('Here');
    return Promise.reject();
  }

  const imageBuffer: Buffer | null = await sharp(data)
    .resize(width, height)
    .toBuffer()
    .catch(() => null);

  if (!imageBuffer) {
    return Promise.reject();
    console.log('Here2');
  }

  return fs
    .writeFile(filePathThumbnailImage, imageBuffer)
    .then(() => {
      return imageBuffer;
    })
    .catch(() => {
      return Promise.reject();
      console.log('Here3');
    });
};

export default { resizeImage };
