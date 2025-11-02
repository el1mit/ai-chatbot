// const axios = require('axios');
// const fs = require('fs');
import axios from 'axios';
import fs from 'fs';

const imageController = {
	async saveImage(image) {
		const imageBase64 = await fs.readFileSync(image.path, 'base64');
		const formData = new FormData();
		formData.append('key', process.env.IMGBB_API);
		formData.append('image', imageBase64);

		try {
			const response = await axios.post(
				'https://api.imgbb.com/1/upload',
				formData
			);
			return response.data.data.url;
		} catch (error) {
			console.error(error);
			throw new Error('Error uploading image');
		}
	},
};

export default imageController;
