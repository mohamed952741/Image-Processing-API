import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import routes from './routes/main';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (_, res: Response): void => {
  res.status(200).send('server working');
});

app.listen(port, (): void => {
  // make sure thumbnail folder exists
  const thumbPath = path.resolve(__dirname, '../images/thumbnail');

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  console.log(`server started at localhost:${port}'`);
});

export default app;
