import { DataTypes } from 'sequelize';
import db from '../database/index.js';

const Product = db.sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },  
  external_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },  
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },  
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },    
}, {
  tableName: "products",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Product;