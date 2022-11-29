require("dotenv/config");

import { Options } from "sequelize";

const config: Options = {
  dialect: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
  define: {
    timestamps: true,
  },
};

module.exports = config;
