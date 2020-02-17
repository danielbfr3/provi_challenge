import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import AddressController from './app/controllers/AddressController';
import BirthdayController from './app/controllers/BirthdayController';
import NameController from './app/controllers/NameController';
import PhoneController from './app/controllers/PhoneController';
import CpfController from './app/controllers/CpfController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/address', AddressController.store);
routes.put('/address', AddressController.update);

routes.post('/birthday', BirthdayController.store);
routes.put('/birthday', BirthdayController.update);

routes.post('/name', NameController.store);
routes.put('/name', NameController.update);

routes.post('/phone', PhoneController.store);
routes.put('/phone', PhoneController.update);

routes.post('/cpf', CpfController.store);
routes.put('/cpf', CpfController.update);

export default routes;
