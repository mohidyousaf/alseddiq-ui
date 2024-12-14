import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL
        rejectUnauthorized: false, // Skip SSL certificate validation (useful for local dev)
      },
    },
    pool: {
			min: 0,
			max: 10,
			acquire: 30000,
			idle: 10000
		},
    logging: console.log, // Disable SQL logging
  }
);
// Export the Sequelize instance for use across the app
export default sequelize;
