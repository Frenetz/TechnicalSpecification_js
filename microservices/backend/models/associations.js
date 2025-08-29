import Product from './Product.js';
import ProductAttribute from './ProductAttribute.js';
import ProductImage from './ProductImage.js';

Product.hasMany(ProductAttribute, { foreignKey: 'product_id', as: 'attributes' });
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });

ProductAttribute.belongsTo(Product, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

export { Product, ProductAttribute, ProductImage };