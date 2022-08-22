import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import imageControl from '../controllers/imageControl';
import { Stats } from 'fs';

const imageRoute = express.Router();

imageRoute.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query['filename'];
  const height = req.query['height']
    ? parseInt(req.query['height'] as string, 10)
    : null;
  const width = req.query['width']
    ? parseInt(req.query['width'] as string, 10)
    : null;

  //check if the request is available
  if (!filename || !height || !width) {
    res
      .status(400)
      .send(
        'Please make sure url contains correct filename, height and width parameters'
      );
    return;
  }

  //get the full path from the filename
  const filePathOriginalImage = `${path.resolve(
    __dirname,
    `../../images/original/${filename}.jpg`
  )}`;

  //thumbnail path in the ${filename}-${height}x${width} format
  const filePathThumbnailImage = `${path.resolve(
    __dirname,
    `../../images/thumbnail/${filename}-${height}x${width}.jpg`
  )}`;

  // Check if filename exists in Original folder and send error if not found
  const fullImage: Stats | null = await fs
    .stat(filePathOriginalImage)
    .catch(() => {
      res.status(404).send('Image does not exist');
      return null;
    });

  if (!fullImage) {
    return;
  }

  // Check if thumbnail was already created
  const existingThumbnail: Stats | null = await fs
    .stat(filePathThumbnailImage)
    .catch(() => {
      return null;
    });

  if (existingThumbnail) {
    fs.readFile(filePathThumbnailImage)
      .then((thumbnailData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbnailData);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  } else {
    // resizeing image
    imageControl
      .resizeImage({
        width,
        height,
        filePathOriginalImage,
        filePathThumbnailImage,
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage);
      })
      .catch(() => {
        res.status(500).send('Error occured Resizing the image');
      });
  }
});

export default imageRoute;
