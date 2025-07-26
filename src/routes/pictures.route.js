import { Router } from 'express';
import multer from 'multer';
import PicturesController from '../controllers/pictures.controller.js';

const picturesRoutes = Router();

const upload = multer({ storage: multer.memoryStorage() });

picturesRoutes.get('/', PicturesController.getAll);
picturesRoutes.get('/:id', PicturesController.getById);
picturesRoutes.post('/', upload.single('image'), PicturesController.insertPicture);
picturesRoutes.delete('/:id', PicturesController.removePicture);

export default picturesRoutes;
