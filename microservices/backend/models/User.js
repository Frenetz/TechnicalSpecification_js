import { DataTypes } from 'sequelize';
import db from '../database/index.js';
import bcrypt from 'bcrypt';

const User = db.sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return undefined;
    }
  },
}, {
  tableName: "users",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  // hooks: {
  //   beforeCreate: async (user) => {
  //     if (user.password) {
  //       user.setDataValue('password', await bcrypt.hash(user.password, 10));
  //     }
  //   },
  //   beforeUpdate: async (user) => {
  //     if (user.changed("password")) {
  //       user.setDataValue('password', await bcrypt.hash(user.password, 10));
  //     }
  //   }
  // } 
});

// User.prototype.validatePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

export default User;