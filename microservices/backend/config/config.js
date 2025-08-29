import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.dialect
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB + '_test',
    host: process.env.HOST,
    dialect: process.env.dialect
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.dialect
  }
};