import { Router } from 'express';
import EssentialsController from '../controllers/essentials.controller.js';

const essentialsRoutes = Router();

essentialsRoutes.get('/', EssentialsController.getAll);
essentialsRoutes.post('/', EssentialsController.insertEssential);
essentialsRoutes.delete('/:id', EssentialsController.removeEssential);
essentialsRoutes.put('/:id', EssentialsController.updateEssential);

export default essentialsRoutes;
