import { Router } from 'express';
import MagasinsController from '../controllers/magasins.controller.js';

const magasinsRoutes = Router();

magasinsRoutes.get('/', MagasinsController.getAll);
magasinsRoutes.post('/', MagasinsController.insertStore);
magasinsRoutes.delete('/:id', MagasinsController.removeStore);
magasinsRoutes.put('/:id', MagasinsController.updateStore);

export default magasinsRoutes;
