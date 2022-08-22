//importing helper modules
import express from 'express';
import images from './imageRoute';
import imagesRouter from './allImagesRoute';

//establishing router
const routes = express.Router();

//using routes
routes.use('/images', images);
routes.use('/listImages', imagesRouter);

//exporting routes
export default routes;
