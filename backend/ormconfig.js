// TypeORM CLI config — used for migration:generate / migration:run
// Usage: npm run typeorm -- migration:generate -d ormconfig.js src/migrations/MigrationName
require("dotenv").config();
const { DataSource } = require("typeorm");

module.exports = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  synchronize: false,
  entities: ["dist/entities/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  migrationsTableName: "typeorm_migrations",
});
