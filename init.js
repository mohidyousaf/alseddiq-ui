// File: init.js
console.log("init");

import { db } from "./src/server/models/index.js";
import sequelize from "./src/server/utils/db.js";


const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    //Sync models if necessary
    db.sequelize.sync({ alter: true, logging: true }).then(() => {
      console.log("Models synchronized");
    });
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
};

initializeApp();
