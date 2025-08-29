import Product from "../models/Product.js";
import ProductAttribute from "../models/ProductAttribute.js";
import ProductImage from "../models/ProductImage.js";

class ProductRepository {
	async getAllProducts() {
		try {
			const products = await Product.findAll({
				include: [
					{
						model: ProductAttribute,
						as: 'attributes'
					},
					{
						model: ProductImage,
						as: 'images'
					}
				]
			});
			return products;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async getProductById(id) {
		try {
			const product = await Product.findOne({
				where: { id },
				include: [
					{
						model: ProductAttribute,
						as: 'attributes'
					},
					{
						model: ProductImage,
						as: 'images'
					}
				]
			});

			return product;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async getMyProducts(user_id) {
		try {
			const products = await Product.findAll({
				where: { user_id },
				include: [
					{
						model: ProductAttribute,
						as: 'attributes'
					},
					{
						model: ProductImage,
						as: 'images'
					}
				]
			});

			return products;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}

export default new ProductRepository();