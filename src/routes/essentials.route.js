import { Router } from 'express';
import EssentialsController from '../controllers/essentials.controller.js';

const essentialsRoutes = Router();

essentialsRoutes.get('/', EssentialsController.getAll);


export default essentialsRoutes;
