const Category = require('../models/Category');

class CategoryController {
	async getAllCategories(req, res) {
		try {
			const categories = await Category.find();
			res.status(200).json(categories);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async getCategoryById(req, res) {
		try {
			const { id } = req.params;
			const category = await Category.findById(id);
			if (!category) {
				return res.status(404).json({ message: 'Category not found' });
			}
			res.status(200).json(category);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async createCategory(req, res) {
		try {
			console.log(req.body);
			const category = await Category.create(req.body);
			res.status(201).json(category);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async updateCategory(req, res) {
		try {
			const { id } = req.params;
			const category = await Category.findByIdAndUpdate(id, req.body);

			if (!category) {
				res.status(404).json({ message: 'Category not found' });
			}

			const updatedCategory = await Category.findById(id);
			return res.status(200).json(updatedCategory);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async deleteCategory(req, res) {
		try {
			const { id } = req.params;
			const category = await Category.findByIdAndDelete(id);
			if (!category) {
				return res.status(404).json({ message: 'Category not found' });
			}
			res.status(200).json({ message: 'Category Deleted' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = new CategoryController();
