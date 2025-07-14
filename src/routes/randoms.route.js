import { Router } from 'express';
import Randomscontroller from '../controllers/randoms.controller.js';

const randomsRoutes = Router();

randomsRoutes.get('/', Randomscontroller.getAll);


export default randomsRoutes;
