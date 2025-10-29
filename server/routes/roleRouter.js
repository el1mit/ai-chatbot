const express = require('express');
const roleController = require('../controllers/roleController');

const roleRouter = express.Router();
const RoleController = new roleController();

roleRouter.get('/', RoleController.getAllRoles);
roleRouter.post('/', RoleController.createRole);
roleRouter.put('/:id', RoleController.updateRole);

module.exports = roleRouter;
