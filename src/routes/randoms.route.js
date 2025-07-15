import { Router } from 'express';
import Randomscontroller from '../controllers/randoms.controller.js';

const randomsRoutes = Router();

randomsRoutes.get('/', Randomscontroller.getAll);
randomsRoutes.post('/', Randomscontroller.insertRandom);
randomsRoutes.delete('/:id', Randomscontroller.removeRandom);
randomsRoutes.put('/:id', Randomscontroller.updateRandom);

export default randomsRoutes;
