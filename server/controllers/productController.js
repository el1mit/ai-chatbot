const Product = require('../models/Product');
const imageController = require('./imageController');

class productController {
	async getAllProducts(req, res) {
		try {
			const products = await Product.find({});
			return res.status(200).json(products);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async getProductById(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findById(id);
			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}
			return res.status(200).json(product);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async createProduct(req, res) {
		try {
			// console.log(req.body);
			// console.log(req.files.image);
			const imageLink = await imageController.saveImage(req.files.image);
			console.log(imageLink);
			const product = await Product.create({ ...req.fields, image: imageLink });
			return res.status(200).json(product);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async updateProduct(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findByIdAndUpdate(id, req.body);
			if (!product) {
				res.status(404).json({ message: 'Product not found' });
			}

			const updatedProduct = await Product.findById(id);
			return res.status(200).json(updatedProduct);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async deleteProduct(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findByIdAndDelete(id);
			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}

			return res.status(200).json({ message: 'Product Deleted' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = productController;
