import { Router } from 'express';
import Randomscontroller from '../controllers/randoms.controller.js';

const randomsRoutes = Router();

randomsRoutes.get('/', Randomscontroller.getAll);
randomsRoutes.post('/', Randomscontroller.insertRandom);

export default randomsRoutes;
