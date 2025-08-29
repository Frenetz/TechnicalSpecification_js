import { DataTypes } from 'sequelize';
import db from '../database/index.js';

const ProductAttribute = db.sequelize.define("ProductAttribute", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },	
  product_id: {
	  type: DataTypes.INTEGER,
  },
  key: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
}, {
  tableName: "product_attributes",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ProductAttribute;