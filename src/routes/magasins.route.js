import { Router } from 'express';
import MagasinsController from '../controllers/magasins.controller.js';

const magasinsRoutes = Router();

magasinsRoutes.get('/', MagasinsController.getAll);


export default magasinsRoutes;
