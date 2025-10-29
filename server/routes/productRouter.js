const express = require('express');
const productController = require('../controllers/productController');
const formidableMiddleware = require('express-formidable');
const { verifyToken } = require('../utils/tokenManager');

const productRouter = express.Router();
const ProductController = new productController();

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.post(
	'/',
	formidableMiddleware(),
	ProductController.createProduct
);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

module.exports = productRouter;
