import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductAttribute from '../models/ProductAttribute.js';
import ProductImage from '../models/ProductImage.js';
import ProductRepository from '../repositories/ProductRepository.js';
import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductService {
	async getAllProducts() {
		return ProductRepository.getAllProducts();
	}


	async addProducts(user_id, data) {
		const prefix = "Доп. поле: ";
		for (let i = 0; i < data.length; i++) {
			const productObj = {};
			const productAttributes = [];
			productObj["user_id"] = user_id;
			productObj["external_code"] = data[i]['UUID'];
			productObj["name"] = data[i]['Наименование'];
			productObj["description"] = data[i]['Описание'];
			productObj["price"] = data[i]['Цена: Цена продажи'].replace(",", ".");
			const salePrice = parseFloat(data[i]['Цена: Цена продажи'].replace(",", "."));
			const buyPrice = parseFloat(data[i]['Закупочная цена'].replace(",", "."));
			productObj["discount"] = (salePrice - buyPrice) / salePrice * 100;
			const product = await Product.create(productObj);

			for (const key in data[i]) {
				if (key === 'Доп. поле: Ссылки на фото') {
					const imgUrls = data[i][key].split(", ");
					for (let j = 0; j < imgUrls.length; j++) {
						if (imgUrls[j]) {
							const filename = `${uuidv4()}.jpg`;
							const localPath = await this.downloadImage(imgUrls[j], filename);
							
							if (localPath) {
								await ProductImage.create({
									product_id: product.id,
									url: imgUrls[j],
									path: localPath
								});
							}
						}
					}
				}
				else if (key.startsWith('Доп. поле: ')) {
					productAttributes.push({product_id: product.id, key: key.slice(prefix.length), value: data[i][key]});
				}
			}

			await ProductAttribute.bulkCreate(productAttributes);
		}
	}

	async downloadImage(url, filename) {
		try {
			const response = await axios.get(url, { responseType: "arraybuffer" });
			const uploadDir = path.join(__dirname, "../images/products");

			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const filePath = path.join(uploadDir, filename);
			fs.writeFileSync(filePath, response.data);
			return filePath;
		} catch (err) {
			console.error("Error during download:", err.message);
			return null;
		}
	}

	async getProductById(id) {
		return ProductRepository.getProductById(id);
	}

	async getMyProducts(user_id) {
		return ProductRepository.getMyProducts(user_id);
	}
}

export default new ProductService();