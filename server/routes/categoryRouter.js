const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();
const CategoryController = categoryController;

categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.get('/:id', CategoryController.getCategoryById);
categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.put('/:id', CategoryController.updateCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);

module.exports = categoryRouter;
