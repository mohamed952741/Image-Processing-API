import express, { Response, Request } from 'express';
import fs from 'fs/promises';
import path from 'path';

const allImagesRoute = express.Router();

allImagesRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
  const folderPathFullImage = `${path.resolve(
    __dirname,
    '../../images/original'
  )}`;
  //check images
  const files: string[] | null = await fs
    .readdir(folderPathFullImage)
    .catch(() => {
      res.status(500).send('Error occured loading the images');
      return null;
    });

  if (!files) {
    return;
  }
  //creating HTML response
  let htmlResponse = `
        <h1>All images</h1>
        <p>Below you can find all images that are accessible</p>
        <ul>
    `;

  files.forEach((file: string): void => {
    htmlResponse = htmlResponse + `<li>${file}</li>`;
  });

  res.status(200).send(`${htmlResponse}</ul>`);
});

export default allImagesRoute;
