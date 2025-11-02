import express from 'express';
import roleController from '../controllers/roleController.js';

const roleRouter = express.Router();
const RoleController = new roleController();

roleRouter.get('/', RoleController.getAllRoles);
roleRouter.post('/', RoleController.createRole);
roleRouter.put('/:id', RoleController.updateRole);

export default roleRouter;
