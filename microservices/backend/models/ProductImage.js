import { DataTypes } from 'sequelize';
import db from '../database/index.js';

const ProductImage = db.sequelize.define("ProductImage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },	
  product_id: {
	  type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  path: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
}, {
  tableName: "product_images",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ProductImage;