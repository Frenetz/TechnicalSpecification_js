import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;