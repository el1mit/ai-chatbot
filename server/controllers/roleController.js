const Role = require('../models/Role');

class roleController {
	async getAllRoles(req, res) {
		try {
			const roles = await Role.find({});
			return res.status(200).json(roles);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async createRole(req, res) {
		try {
			const role = await Role.create(req.body);
			return res.status(200).json(role);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async updateRole(req, res) {
		try {
			const { id } = req.params;
			const role = await Role.findByIdAndUpdate(id, req.body);
			if (!role) {
				res.status(404).json({ message: 'Role not found' });
			}

			const updatedRole = await Role.findById(id);
			return res.status(200).json(updatedRole);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = roleController;
