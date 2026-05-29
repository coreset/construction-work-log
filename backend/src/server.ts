import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/database.config";
import { seedWorkTypes } from "./utils/seeder.util";
import app from "./app";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    await seedWorkTypes();
    console.log("Database initialized");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  });
