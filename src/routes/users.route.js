import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const usersRoutes = Router();

usersRoutes.get('/', UsersController.getAll);
usersRoutes.get('/:id', UsersController.getById);


export default usersRoutes;
