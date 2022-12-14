import Sequelize from "sequelize";
import dotenv from "dotenv/config"; // Leer el archivo .env

//dotenv.config(); // Leer el archivo .env

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
		port: "3306",
		define: {
			timestamps: false,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		operatorAliases: false,
	}
);

export default db;
