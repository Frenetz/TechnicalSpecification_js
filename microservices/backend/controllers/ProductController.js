import User from '../models/User.js';
import ProductService from '../services/ProductService.js';
import xlsx from 'xlsx';

class ProductController {
	async getAllProducts(req, res) {
		try {
			const products = await ProductService.getAllProducts();

			res.status(200).json({
				status: 'success',
				data: products
			});
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async getProductById(req, res) {
		try {
			const product = await ProductService.getProductById(req.params.id);

			if  (product) {
				res.status(200).json({
					status: 'success',
					data: product
				});
			} else {
				res.status(404).json({
					status: 'error',
					message: "product wasn't found"
				});
			}
		} catch (e) {
			res.status(500).json(e);
		}
	}
	
	async addProducts(req, res) {
		try {
			const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
			const sheet = workbook.Sheets[workbook.SheetNames[0]];
			const data = xlsx.utils.sheet_to_json(sheet);

			await ProductService.addProducts(req.user.id, data);

			res.json({ rows: data });
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}

	async getMyProducts(req, res) {
		try {
			const products = await ProductService.getMyProducts(req.user.id);

			res.status(200).json({
				status: 'success',
				data: products
			});
		} catch (e) {
			res.status(500).json(e);
		}
	}
}

export default new ProductController();