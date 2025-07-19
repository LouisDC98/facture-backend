import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const usersRoutes = Router();

usersRoutes.get('/', UsersController.getAll);
usersRoutes.get('/:id', UsersController.getById);
usersRoutes.post('/', UsersController.insertProfile);
usersRoutes.delete('/:id', UsersController.removeProfile);
usersRoutes.put('/:id', UsersController.updateProfile);


export default usersRoutes;
