import { DataTypes } from 'sequelize';
import db from '../database/index.js';

const RefreshToken = db.sequelize.define("RefreshToken", {
  id: {
	type: DataTypes.INTEGER,
	autoIncrement: true,
	primaryKey: true,
  },	
  user_id: {
	  type: DataTypes.INTEGER,
  },
  refresh_token: {
	type: DataTypes.TEXT,
	allowNull: false,
  },
}, {
  tableName: "refresh_tokens",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default RefreshToken;